"use client"
import axios from "axios";
import PromptForm from "@/components/PromtForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<
  { prompt: string; nPrompt: string; imageUrls: string[] }[]
  >([]);

  const handleHistory = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/history");
    console.log(res.data);

    // ✅ update history records
    setHistory(res.data.histories);
  } catch (err) {
    console.error("Error generating image:", err);
  }
  };

  useEffect(()=>{
    handleHistory();
  }, [])

  const handleGenerate = async (prompt: string, nPrompt: string) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/generate", { prompt, nPrompt }, {
        headers: { "Content-Type": "application/json" },
      });

      setImageUrls(res.data.imageUrls);
      handleHistory();
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen p-4 bg-blue-100 dark:bg-gray-900 text-black dark:text-white">
      <ThemeToggle />
      <h1 className="text-2xl font-bold text-center mb-6">🧠 Text to Image Generator</h1>
      
      {imageUrls.length > 0 && (
        <Carousel className="max-w-xl mx-auto mb-6">
          <CarouselContent>
            {imageUrls.map((url, idx) => (
              <CarouselItem key={idx} className="flex justify-center">
                <img src={url} alt={`Generated ${idx}`} className="rounded-xl shadow-md max-h-64 object-contain" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      )}
      {loading && (
        <div className="flex flex-col items-center justify-center mt-6 space-y-2">
          <LoadingSpinner size={48} />
          <p className="text-sm text-muted-foreground">Generating Image</p>
        </div>
      )}
      
      <PromptForm onSubmit={handleGenerate} />
    
      {/* History section */}
      {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-center mb-4">📝 Generation History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item, idx) => (
                <Card key={idx} className="dark:bg-gray-800 text-black dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-base">Prompt: {item.prompt}</CardTitle>
                    {item.nPrompt && (
                      <p className="text-sm text-muted-foreground">Negative: {item.nPrompt}</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex gap-2 overflow-x-auto">
                    {item.imageUrls.map((url: string, i: number) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Image Expired`}
                        className="rounded-lg w-full max-h-48 object-contain shadow"
                      />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      )}
    </div>
  )
}
