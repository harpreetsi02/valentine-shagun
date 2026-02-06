"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LastPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    date: string;
    food: string;
    dessert: string;
    activities: string;
  } | null>(null);

  // ✅ localStorage ONLY inside useEffect
  useEffect(() => {
    const storedData = {
      date: localStorage.getItem("date") || "",
      food: localStorage.getItem("food") || "",
      dessert: localStorage.getItem("dessert") || "",
      activities: localStorage.getItem("activities") || "",
    };

    setData(storedData);
  }, []);

  // ⛔ build ke time kuch render mat kar
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff5e4] text-[#ff9494] font-mono">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5e4] text-[#ff9494] font-mono flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-4xl font-bold mb-6">
        So it&apos;s a date 💖
      </h1>

      <div className="text-xl space-y-3">
        <p>📅 <b>Date:</b> {data.date}</p>
        <p>🍔 <b>Food:</b> {data.food}</p>
        <p>🍰 <b>Dessert:</b> {data.dessert}</p>
        <p>🎡 <b>Activities:</b> {data.activities}</p>
      </div>

      <p className="mt-8 text-2xl font-semibold">
        Done 🤝 milte hain fir is tareekh ko 💕
      </p>

      <button
        onClick={() => router.push("/login/whatsapp")}
        className="mt-14 px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-lg transition"
      >
        Next →
      </button>
    </div>
  );
}
