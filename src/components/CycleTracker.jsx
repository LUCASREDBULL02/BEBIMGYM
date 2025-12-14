// src/components/CycleTracker.jsx
import React, { useState, useEffect } from "react";

// Hjälpfunktion: få datumsträng (YYYY-MM-DD)
function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

// Ikoner för olika känslor
const moodIcons = {
  Stark: "💪",
  Trött: "😴",
  Neutral: "🙂",
  Stressad: "😵",
  Energiskt: "⚡",
};

// Antal dagar att visa i kalendern
const DAYS_TO_SHOW = 35;

export default function CycleTracker() {
  const [feedbackData, setFeedbackData] = useState({});

  // Ladda feedback från localStorage vid första inladdning
  useEffect(() => {
    const stored = localStorage.getItem("cycleFeedback");
    if (stored) {
      try {
        setFeedbackData(JSON.parse(stored));
      } catch {
        console.warn("Kunde inte läsa cycleFeedback från localStorage.");
      }
    }
  }, []);

  // Skapa lista över de senaste 35 dagarna
  const today = new Date();
  const days = Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (DAYS_TO_SHOW - 1 - i));
    const key = getDateKey(date);
    const mood = feedbackData[key];
    return { date: key, mood };
  });

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Cykelkalender 🩸</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
          gap: 6,
        }}
      >
        {days.map(({ date, mood }) => (
          <div
            key={date}
            style={{
              background: "#1f2937",
              borderRadius: 8,
              padding: 6,
              textAlign: "center",
              fontSize: 12,
              color: "#e5e7eb",
              border: mood ? "2px solid #ec4899" : "1px solid #374151",
              height: 60,
              position: "relative",
            }}
          >
            <div>{date.slice(5)}</div>
            {mood && (
              <div style={{ fontSize: 20, marginTop: 4 }}>
                {moodIcons[mood] || "🩸"}
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
        Visar hur du kände dig efter pass. Ändra i Logga Pass.
      </p>
    </div>
  );
}
