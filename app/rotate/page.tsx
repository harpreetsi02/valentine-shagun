"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function ValentinePage() {
  const [noClickCount, setNoClickCount] = useState(0);
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [showBounceImage, setShowBounceImage] = useState(false);

  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const images = [
    "/yes-images/image1.gif",
    "/yes-images/image2.gif",
    "/yes-images/image3.gif",
    "/yes-images/image4.gif",
    "/yes-images/image5.gif",
    "/yes-images/image7.gif",
    "/yes-images/baddie.jpg",
  ];

  useEffect(() => {
    document.body.style.opacity = "1";
  }, []);

  const playSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
  };

  const handleNoClick = () => {
    playSound();

    if (noClickCount >= 4) return;

    const nextCount = noClickCount + 1;
    setNoClickCount(nextCount);
    setImageIndex(nextCount);

    if (yesBtnRef.current) {
      yesBtnRef.current.style.height = `${48 + nextCount * 35}px`;
      yesBtnRef.current.style.width = `${80 + nextCount * 35}px`;
      yesBtnRef.current.style.fontSize = `${20 + nextCount * 25}px`;
    }
  };

  const handleYesClick = () => {
    playSound();
    setIsYesClicked(true);
    setShowButtons(false);
    setShowBounceImage(true); // 👈 IMPORTANT

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#FF5A5F", "#3DCC91", "#FFD1DC"],
    });
  };

  return (
    <div className="gradient-background md:w-full flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center p-4">
        {showButtons && (
          <img
            src={images[imageIndex]}
            className="rounded-md h-75 object-cover"
            alt="cute"
          />
        )}

        <h2 className="text-4xl font-bold italic text-[#bd1e59] my-4">
          {showButtons ? (
            "Will you be my Valentine?"
          ) : (
            <div className="flex flex-col gap-10">
              <img
                src="/yes-images/image7.gif"
                className="mx-auto w-50"
              />
              <br />
              Congratulations!! Now your my Janeman <br />
              <span className="text-[20px]">
                Mujhe pata tha tu haan kr hi karegi, akhir khar toh tu meri valentine girl!
              </span>

              <button
                onClick={() => router.push("/login/whatsapp")}
                className="mt-6 text-2xl font-serif px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full"
              >
                Aage or surprise hai! 🎁
              </button>
            </div>
          )}
        </h2>

        {showBounceImage && (
          <img
            src="/yes-images/baddie.jpg"
            alt="baddie"
            className="absolute w-65 h-70 rounded-full border-4 border-pink-400 animate-bounce"
            style={{ top: "10%", left: "55%", transform: "translateX(-30%)" }}
          />
        )}

        {showButtons && (
          <div className="flex gap-4 pt-5 items-center relative">
            <button
              ref={yesBtnRef}
              onClick={handleYesClick}
              className="bounce2 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-md text-[20px]"
            >
              Yes
            </button>

            <button
              ref={noBtnRef}
              onClick={handleNoClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-[20px]"
            >
              {["No", "Banja meri Valentine", "Baby, Hot chocolate brownie khilaunga...", "Dekh le bahut saara pyaar krunga tujhe...", "Maan rahi hai ye nahi aau abhi..."][noClickCount]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
