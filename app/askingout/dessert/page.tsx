"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DessertPage() {

  const router = useRouter();

  const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const desserts = [
    { name: "Boba", img: "/askphoto/food/boba.jpeg" },
    { name: "Hot Chocolate Brownie", img: "/askphoto/food/hot-chocolate-brownie.jpg" },
    { name: "Rabbdi", img: "/askphoto/food/rabbdi.jpeg" },
    { name: "Ice-Creme", img: "/askphoto/food/ice-creme.webp" },
    { name: "Gulab Jamun", img: "/askphoto/food/gulabjamun.jpg" },
    { name: "Rasmalai", img: "/askphoto/food/rasmalai.jpeg" },
  ];

  const toggleDessert = (dessert: string) => {

    setSelectedDesserts((prev) =>
      prev.includes(dessert)
        ? prev.filter((d) => d !== dessert)
        : [...prev, dessert]
    );

    setError("");
  };

  // ⭐ Save to localStorage safely
  useEffect(() => {
    localStorage.setItem("dessert", selectedDesserts.join(", "));
  }, [selectedDesserts]);

  const handleSubmit = async () => {

    const requestId = localStorage.getItem("requestId");

    if (selectedDesserts.length === 0) {
      setError("Select at least one dessert 😤🍰");
      return;
    }

    try {

      await fetch(`http://localhost:8081/api/user/message/${requestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: `Dessert Choice: ${selectedDesserts.join(", ")}`,
        }),
      });

      router.push("/askingout/activity");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5e4] text-[#ff9494] font-mono text-center px-6 py-10">

      <h1 className="text-[50px] font-bold mb-10">
        Which dessert we eatin cuh
      </h1>

      <div className="flex flex-wrap justify-center">

        {desserts.map((dessert) => (

          <div
            key={dessert.name}
            className="m-3 cursor-pointer"
            onClick={() => toggleDessert(dessert.name)}
          >

            <img
              src={dessert.img}
              alt={dessert.name}
              className={`h-50 w-50 rounded-full border-[5px] p-2 object-cover transition ${
                selectedDesserts.includes(dessert.name)
                  ? "border-pink-600 scale-105"
                  : "border-[#ff9494]"
              }`}
            />

            <p className="mt-2">{dessert.name}</p>

          </div>

        ))}

      </div>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-8 px-5 py-2 text-lg bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1] transition hover:bg-[#ff9494] hover:text-[#ffe3e1]"
      >
        Continue UwU
      </button>

    </div>
  );
}
