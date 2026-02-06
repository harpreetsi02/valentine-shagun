"use client";

import { useRouter } from "next/navigation";

export default function ShayariPage1() {

  const router = useRouter();

  return (
    <div className="min-h-screen font-serif bg-black text-white flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-2xl md:text-4xl font-semibold mb-10">
            Aisa kiya ho skta hai ki shayari na ho... <br /> Or vaise bhi tere pr hi toh likhta hu ye saari, sunane ka <br /> mauka hi nahi milta mujhe tujhko... <br /> Or vaise bhi ye website hi adhuri hai shayari ke bina...
        </h1>
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-semibold mb-10">
        Mai hega waa 😊❤️
      </h2>

      {/* Shayari */}
      <div className="space-y-5 text-left text-lg md:text-xl leading-relaxed text-gray-200 max-w-xl">

        <p>
          Bas hasdi reha kr tu... <br />
          Das ki kimmat tere hassan lai(ke liye)...! <br />
          <br />
          Har gall mainu dasiya kr tu... <br />
          Bahuta sochiya na kr kujh dasan(batane) lai...! <br />
          <br />
          Har waqt tension naa liya kr sajna... <br />a
          Mai hega teri tension chakan(uthane) lai...!
        </p>

        <p className="mt-6 text-right text-sm text-gray-400">- Harpreet</p>

      </div>

      {/* Next Button */}
      <button
        onClick={() => router.push("/shayari/page2")}
        className="mt-14 px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-lg transition"
      >
        Next →
      </button>
    </div>
  );
}
