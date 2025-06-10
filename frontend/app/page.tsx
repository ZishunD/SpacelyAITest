"use client"
import axios from "axios";


import PromptForm from "@/components/PromtForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (prompt: string, nPrompt: string) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/generate", { prompt, nPrompt }, {
        headers: { "Content-Type": "application/json" },
      });

      setImageUrls(res.data.imageUrls);
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
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

      <PromptForm onSubmit={handleGenerate} />
      {loading && <p className="text-center mt-4">⏳ Generating image...</p>}
    </div>
  )
}
