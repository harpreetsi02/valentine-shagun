"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ValentinesProposal() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [pos, setPos] = useState({ top: "60%", left: "55%" });

  const moveNo = () => {
    setPos({
      top: `${Math.random() * 70}%`,
      left: `${Math.random() * 70}%`,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {!accepted ? (
        <>
          <h1 className="text-5xl mb-8">Toh ab toh mujhse pyaar hone laga hai? 💕</h1>

          <Image src="/sad_hamster.png" alt="" width={180} height={180} />

          <div className="mt-10 flex gap-6">
            <button
              className="px-6 py-3 bg-pink-500 rounded-xl text-lg"
              onClick={() => setAccepted(true)}
            >
              Yes 🥰
            </button>

            <button
              className="px-6 py-3 bg-gray-600 rounded-xl text-lg absolute"
              style={pos}
              onMouseEnter={moveNo}
            >
              No 😢
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-5xl mb-6">Mujhe pata tha ek na ek din ho jayega ❤️</h1>
            <Image src="/hamster_jumping.gif" alt="" width={200} height={200} />
          </div>

          <button
            onClick={() => router.push("/login/snapchat")}
            className="mt-14 px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-lg transition"
          >
            Toh Next Chalo next Surprise ki or →
          </button>
        </motion.div>
      )}
    </div>
  );
}
