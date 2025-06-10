import { NextResponse } from "next/server";

const SPACELY_API_KEY = process.env.SPACELY_API_KEY || "";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    });
}

export async function POST(request: Request) {
    try {
        const { prompt, nPrompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
        }

        // call spacely AI generation endpoint
        const generateRes = await fetch("https://api.spacely.ai/api/v1/generate/text-to-image", {
            method: "POST",
            headers: {
                "X-API-KEY": SPACELY_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, nPrompt }),
        });

        if (!generateRes.ok) {
            const errText = await generateRes.text();
            throw new Error(`Spacely generate API error: ${errText}`);
        }

        const generateData = await generateRes.json();
        const refId = generateData.data;

        // 轮询结果
        let attempt = 0;
        let resultData: string[] | null = null;
        while (attempt < 20) {
            await sleep(2000);
            const pollRes = await fetch(
                `https://api.spacely.ai/api/v1/generate/poll-result?refId=${refId}`,
                {
                    headers: {
                        "X-API-KEY": SPACELY_API_KEY,
                    },
                }
            );
            if (!pollRes.ok) {
                const errText = await pollRes.text();
                throw new Error(`Spacely poll API error: ${errText}`);
            }
            const pollData = await pollRes.json();
            if (pollData.data.status === "success") {
                resultData = pollData.data.result;
                break;
            } else if (pollData.data.status === "failed") {
                throw new Error("Spacely generation failed");
            }
            attempt++;
        }

        if (!resultData) {
            return NextResponse.json({ error: "Timeout waiting for image generation" }, { status: 504 });
        }

        return NextResponse.json({ imageUrls: resultData }, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",  // 前端地址
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });
    } catch (error: any) {
        console.error("Error in /api/generate:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
