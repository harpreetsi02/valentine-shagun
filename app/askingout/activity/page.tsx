"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ActivitiesPage() {

  const router = useRouter();

  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [error, setError] = useState("");

  const activities = [
    { name: "Arcade", img: "/askphoto/activities/arcade.jpeg" },
    { name: "Cinema", img: "/askphoto/activities/cinema.jpeg" },
    { name: "Exhibition", img: "/askphoto/activities/kunsthalle.jpeg" },
    { name: "Park", img: "/askphoto/activities/park.jpeg" },
  ];

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  // ✅ Safe LocalStorage save
  useEffect(() => {
    localStorage.setItem("activities", selectedActivities.join(", "));
  }, [selectedActivities]);

  const handleSubmit = async () => {

    if (selectedActivities.length === 0) {
      setError("Select at least one activity 😏");
      return;
    }

    const requestId = localStorage.getItem("requestId");

    const payload = {
      selectedDate: localStorage.getItem("date"),
      foodChoice: localStorage.getItem("food"),
      dessertChoice: localStorage.getItem("dessert"),
      activitiesChoice: selectedActivities.join(", "),
    };

    await fetch(`http://localhost:8081/api/user/final/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.push("/askingout/lastpage");
    console.log("FINAL ID:", requestId);
  };

  return (
    <div className="min-h-screen bg-[#fff5e4] text-[#ff9494] font-mono text-center px-6 py-10">

      <h1 className="text-[50px] font-bold mb-10">
        What are we doing after?
      </h1>

      <div className="flex flex-wrap justify-center">

        {activities.map((activity) => (

          <div
            key={activity.name}
            className="m-3 cursor-pointer"
            onClick={() => toggleActivity(activity.name)}
          >

            <img
              src={activity.img}
              alt={activity.name}
              className={`h-50 w-50 rounded-full border-[5px] p-2 object-cover transition ${
                selectedActivities.includes(activity.name)
                  ? "border-pink-600 scale-105"
                  : "border-[#ff9494]"
              }`}
            />

            <p className="mt-2">{activity.name}</p>

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
        Last page ...
      </button>

    </div>
  );
}
