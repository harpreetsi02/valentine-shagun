"use client";

import { useRouter } from "next/navigation";

export default function ShayariPage1() {

  const router = useRouter();

  return (
    <div className="min-h-screen font-serif bg-black text-white flex flex-col justify-center items-center text-center px-6">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-10">
        Kehde ab toh 😊❤️
      </h1>

      {/* Shayari */}
      <div className="space-y-5 text-left text-lg md:text-xl leading-relaxed text-gray-200 max-w-xl">

        <p>
            Kisse paache inta na fire... <br />
            Jitne tere paache bhatak re hai...! <br />
            <br />
            Laake chaati ke kehde na "I Love You"... <br />
            Chhori... Tere bhi konse saans atak re hai...!
        </p>

        <p className="mt-6 text-right text-sm text-gray-400">- Harpreet</p>

        <h4 className="text-sm">
          Le ek hariyanvi me bhi... <br />
          wo baat alag hai ye maine nahi likhi
        </h4>
      </div>

      {/* Next Button */}
      <button
        onClick={() => router.push("/shayari/page5")}
        className="mt-14 px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-lg transition"
      >
        Next →
      </button>

    </div>
  );
}
