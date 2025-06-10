import { NextResponse } from "next/server";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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

export async function GET() {
    const q = query(
        collection(db, "history"),
        orderBy("createdAt", "desc"),
        limit(20)
    );

    const querySnapshot = await getDocs(q);

    const history = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(history);

    return NextResponse.json({ histories: history }, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",  // 前端地址
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    });
}
