"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#fff5e4] text-[#ff9494] font-mono px-6">

      {/* Thank You Text */}
      <h1 className="text-[50px] font-bold mb-5">
        Mujhe pata tha tu chalegi sath mere! (｡♥‿♥｡)
      </h1>

      {/* Image */}
      <img
        src="/askphoto/thanks.png"
        alt="rizz"
        className="h-75 w-auto mb-3"
      />

      {/* Audio */}
      <audio controls autoPlay loop className="mb-5">
        <source src="/sounds/congratulations.mp3" type="audio/mpeg" />
      </audio>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-5">
        Don't go yet!
      </h1>

      {/* Button */}
      <button
        onClick={() => router.push("/askingout/date")}
        className="px-5 py-2.5 text-lg bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1] shadow-md transition-all duration-300 hover:bg-[#ff9494] hover:text-[#ffe3e1] hover:border-[#ff9494]"
      >
        Click me heheehe...
      </button>

    </div>
  );
}
