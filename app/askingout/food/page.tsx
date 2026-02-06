"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../config/api";

export default function FoodPage() {

  const router = useRouter();

  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [error, setError] = useState("");

  const foods = [
    { name: "Burgers & fried chicken", img: "/askphoto/food/burgers.jpeg" },
    { name: "Korean food", img: "/askphoto/food/koreanfood.jpeg" },
    { name: "Pasta", img: "/askphoto/food/pasta.jpeg" },
    { name: "Pizza", img: "/askphoto/food/pizza.jpeg" },
    { name: "Salad", img: "/askphoto/food/salad.jpeg" },
    { name: "Steak", img: "/askphoto/food/steak.jpeg" },
  ];

  const toggleFood = (food: string) => {

    setSelectedFoods((prev) =>
      prev.includes(food)
        ? prev.filter((f) => f !== food)
        : [...prev, food]
    );

    setError("");
  };

  // ⭐ Save to localStorage safely
  useEffect(() => {
    localStorage.setItem("food", selectedFoods.join(", "));
  }, [selectedFoods]);

  const handleSubmit = async () => {

    const requestId = localStorage.getItem("requestId");

    if (selectedFoods.length === 0) {
      setError("Please select at least one food 😠🍔");
      return;
    }

    try {

      await fetch(`${API_BASE_URL}/api/user/message/${requestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: `Food Choice: ${selectedFoods.join(", ")}`,
        }),
      });

      router.push("/askingout/dessert");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5e4] text-[#ff9494] font-mono text-center px-6 py-10">

      <h1 className="text-[50px] mb-10 font-bold">
        What food would you like to eat?
      </h1>

      <div className="flex flex-wrap justify-center">

        {foods.map((food) => (

          <div
            key={food.name}
            className="m-3 cursor-pointer"
            onClick={() => toggleFood(food.name)}
          >

            <img
              src={food.img}
              alt={food.name}
              className={`h-50 w-50 rounded-full border-[5px] p-2 object-cover transition ${
                selectedFoods.includes(food.name)
                  ? "border-pink-600 scale-105"
                  : "border-[#ff9494]"
              }`}
            />

            <p className="mt-2">{food.name}</p>

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
        Continue Hihihhh...
      </button>

    </div>
  );
}