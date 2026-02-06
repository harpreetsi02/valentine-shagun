"use client";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function TextFooter() {
  return (
    <>
      <h1
        className={`absolute left-8 bottom-10 text-white text-4xl ${playfair.className}`}
      >
        Match <span className="text-gray-400">the pairs</span>
      </h1>

      <h1
        className={`absolute right-8 bottom-10 text-white text-4xl text-right ${playfair.className}`}
      >
        to unlock <span className="text-gray-400">the surprise</span>
      </h1>
    </>
  );
}
