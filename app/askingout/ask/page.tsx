"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AskPage() {
  const router = useRouter();
  const [yesSize, setYesSize] = useState(18);

  const handleNoClick = () => {
    setYesSize((prev) => prev + 10);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff5e4] text-[#ff9494] font-mono text-center px-6">

      {/* Question */}
      <h1 className="text-[50px] mb-4 font-bold">
        Would you like to go on a date with me? (｡♥‿♥｡)
      </h1>

      {/* YES BUTTON */}
      <button
        style={{ fontSize: `${yesSize}px` }}
        onClick={() => router.push("/askingout/thankyou")}
        className="px-5 py-2.5 m-2 mb-5 bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1] shadow-md transition-all duration-300 hover:bg-[#ff9494] hover:text-[#ffe3e1] hover:border-[#ff9494]"
      >
        Yes
      </button>

      {/* NO BUTTON */}
      <button
        onClick={handleNoClick}
        className="px-5 py-2.5 text-lg m-2 mb-5 bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1] shadow-md transition-all duration-300 hover:bg-[#ff9494] hover:text-[#ffe3e1] hover:border-[#ff9494]"
      >
        I no no wanna o(╥﹏╥)o
      </button>

      {/* Image */}
      <img
        src="/askphoto/please.png"
        alt="cat asking"
        className="h-100 w-auto p-2.5"
      />

    </div>
  );
}
