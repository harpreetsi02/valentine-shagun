"use client";

import { useRouter } from "next/navigation";

export default function ShayariPage1() {

  const router = useRouter();

  return (
    <div className="min-h-screen font-serif bg-black text-white flex flex-col justify-center items-center text-center px-6">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-10">
        Akhaan de Kamal tere 😊❤️
      </h1>

      {/* Shayari */}
      <div className="space-y-5 text-left text-lg md:text-xl leading-relaxed text-gray-200 max-w-xl">

        <p>
            Tang karde tere supne raat nu... <br />
            Jad jaggan lutne khiyaal tere...! <br />
            <br />
            Kidre vi chit(mn) lagda nahi hun... <br />
            Kitte hoye ne bure haal mere...! <br />
            <br />
            Lagdi soniyaan banneyaan(baandhe) zulfan teriyaan... <br />
            Sohne lagde khule baal tere...! <br />
            <br />
            Dil nu mohit kar laindiya(leti) ne(hai)... <br />
            Kujh aise ne akhaan de kamal tere...!
        </p>

        <p className="mt-6 text-right text-sm text-gray-400">- Harpreet</p>

      </div>

      {/* Next Button */}
      <button
        onClick={() => router.push("/shayari/page4")}
        className="mt-14 px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-lg transition"
      >
        Next →
      </button>

    </div>
  );
}
