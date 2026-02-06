"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [fallingItems, setFallingItems] = useState<{ icon: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    document.body.classList.add("fade-in");

    return () => {
      document.body.classList.remove("fade-in");
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("fade-in");

    const icons = [
      "❤️","❤️","❤️","❤️","❤️",
      "💖","💖","💖","💖","💖",
      "✨","✨","✨","✨","✨",
      "💝","💝","💝","💝","💝",
      "🌸","🌸","🌸","🌸","🌸"
    ];

    const generated = icons.map((icon, i) => ({
      icon,
      left: `${(i * 8) % 100}%`,
      delay: `${Math.random() * 4}s`,
    }));

    setFallingItems(generated);

    return () => {
      document.body.classList.remove("fade-in");
    };
  }, []);

  const handleNavigate = (path: string) => {
    document.body.classList.remove("fade-in");
    document.body.style.opacity = "0";

    setTimeout(() => {
      router.push(path);
    }, 800);
  };

  return (
    <div className="romantic-layout">
      {/* Falling Hearts & Confetti */}
      {fallingItems.map((item, i) => (
        <div
          key={i}
          className="falling"
          style={{
            left: item.left,
            animationDelay: item.delay,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Balloons */}
      {[15, 35, 55, 75].map((left, i) => (
        <div
          key={i}
          className="balloon"
          style={{ left: `${left}%`, animationDelay: `${i * 2}s` }}
        />
      ))}

      {/* Center Card */}
      <div className="card">
        <h1>Hanji Soniyon tere liye ek hor Surprise 💖💖</h1>
        <div className="icons">💕 ✨</div>
        <h3>Tujhe toh pata hi hai ki mai kuch na kuch krta hi hu tujhe ye surprice krne ke liye...</h3>
        <p>
          Par abki baar ka kuch alag hai... haan haan bahut alag dekh or bata kaisa hai... 🌹
        </p>

        <button className="btn" onClick={() => router.push("/rotate")}>
          Toh surprise ke liye tyaar hai 😍💖
        </button>
      </div>
    </div>
  );
}
