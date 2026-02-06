"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DatePage() {

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");

  // ⭐ Today's date (dynamic)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {

    const requestId = localStorage.getItem("requestId");

    // ❌ Empty date
    if (!selectedDate) {
      setError("Please select a date 🥺");
      return;
    }

    // ❌ Past date
    if (selectedDate < today) {
      setError("Past date allowed nahi hai 😏");
      return;
    }

    // ✅ Save in localStorage
    localStorage.setItem("date", selectedDate);

    try {

      await fetch(`http://localhost:8081/api/user/message/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: `Selected Date: ${selectedDate}`,
        }),
      });

      // ✅ Next Page
      router.push("/askingout/food");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#fff5e4] text-[#ff9494] font-mono px-6">

      <h1
        title="choose a date"
        className="text-[40px] mb-6"
      >
        Are you free on ... <br />
        <span className="font-serif text-4xl">Soch samjh ke choose krna date okie...</span>
      </h1>

      <div className="flex flex-col items-center text-[25px]">

        <label className="mb-4">
          Which day: <span className="font-serif">(select a date cutie..)</span>
        </label>

        <input
          type="date"
          min={today}
          max="2026-03-31"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setError("");
          }}
          className="px-3 py-2 text-[15px] bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1]"
        />

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 text-[15px] bg-[#ffe3e1] text-[#e67373] rounded-xl border-2 border-[#ffe3e1] transition hover:bg-[#ff9494] hover:text-[#ffe3e1]"
        >
          Submit
        </button>

      </div>
    </div>
  );
}
