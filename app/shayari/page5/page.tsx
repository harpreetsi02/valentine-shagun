"use client";

import { useRouter } from "next/navigation";

export default function ShayariPage1() {

  const router = useRouter();

  return (
    <div className="min-h-screen font-serif bg-black text-white flex flex-col justify-center items-center text-center px-6">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-10">
        Jad Baal kholdi a 😊❤️
      </h1>

      {/* Shayari */}
      <div className="space-y-5 text-left text-lg md:text-xl leading-relaxed text-gray-200 max-w-xl">

        <p>
            Tu sachi kudrat pairaan ch roldi ae... <br />
            Jad Tu apne baal kholdi ae...! <br />
            Sab koyal fikiyaan pai jandiyaan ne... <br />
            Jad bulla(lips) cho koi lafaz boldi ae...! <br />
            <br />
            Jad vekha zulfan kholdi nu... <br />
            Meriya akhaan ohne te reh jandiyaan ne...! <br />
            Ishq mohabbat pyaar diyaan galla... <br />
            Bin bole ohnu keh jandiyaan ne...! <br />
            <br />
            Mainu hosh vosh fir rehnda nahi... <br />
            Jad tenu(tujhe) vekhan(dekhu) khulle baala ch...! <br />
            Fir har pal ghumdi rehndi ae... <br />
            Mere supne te mere khiyaala ch...! <br />
            <br />
            Mere dil de panne tu... <br />
            Dunge(ghehre) naina(eyes) naal kholdi ae...! <br />
            Tu sachi kudrat pairaan ch roldi ae... <br />
            Jad Tu apne baal kholdi ae...!
        </p>

        <p className="mt-6 text-right text-sm text-gray-400">- Harpreet</p>

      </div>

      <h4>
        Bas ye hai abhi toh kuch shayari jo maine tere par likhi hai... <br /> Sachi pata nahi kaise likh deta hu tujhe soch kr (｡♥‿♥｡) <br />
        Bas itni hi bna paya mai... <br />
        Love You Bugge ❤️
      </h4>

    </div>
  );
}
