"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 👉 all 36 images
const ALL_IMAGES = Array.from(
  { length: 36 },
  (_, i) => `/shagun-photo/${i + 1}.avif`
);

// ❤️ heart layout (same as tera)
const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type Card = {
  id: number;
  img: string;
};

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function PhotoPairGame({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  // 🔥 create game once
  useEffect(() => {
    const selected18 = shuffle(ALL_IMAGES).slice(0, 18);

    const pairs: Card[] = shuffle(
      selected18.flatMap((img, i) => [
        { id: i, img },
        { id: i, img },
      ])
    );

    setCards(pairs);
  }, []);

  const handleClick = (index: number) => {
    if (open.length === 2) return;
    if (open.includes(index) || matched.includes(index)) return;

    const newOpen = [...open, index];
    setOpen(newOpen);

    if (newOpen.length === 2) {
      const [a, b] = newOpen;

      if (cards[a].id === cards[b].id) {
        setMatched((prev) => [...prev, a, b]);
        setTimeout(() => setOpen([]), 400);
      } else {
        // ❗ show both for 1s (your requirement)
        setTimeout(() => setOpen([]), 1000);
      }
    }
  };

  // 🎉 game completed
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      onComplete();
    }
  }, [matched, cards, onComplete]);

  return (
    <div className="grid grid-cols-9 gap-2">
      {heartLayout.flat().map((pos, i) =>
        pos === null ? (
          <div key={i} className="w-20 h-20" />
        ) : (
          <motion.div
            key={i}
            onClick={() => handleClick(pos)}
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 relative cursor-pointer"
          >
            {open.includes(pos) || matched.includes(pos) ? (
              <Image
                src={cards[pos]?.img}
                alt=""
                fill
                className="rounded object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 rounded" />
            )}
          </motion.div>
        )
      )}
    </div>
  );
}
