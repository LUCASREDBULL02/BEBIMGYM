// src/components/CycleTracker.jsx
import React, { useEffect, useState } from "react";
import useCycleLog from "../hooks/useCycleLog";

const emojiMap = {
  energized: "💪",
  tired: "😴",
  moody: "😠",
  normal: "🙂",
};

export default function CycleTracker() {
  const { entries } = useCycleLog();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 20);
    const end = new Date(today);
    end.setDate(end.getDate() + 20);

    const range = [];
    const current = new Date(start);
    while (current <= end) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    setDates(range);
  }, []);

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 4,
        padding: 8,
        background: "rgba(30,41,59,0.6)",
        borderRadius: 12,
      }}
    >
      {dates.map((date) => {
        const dateStr = formatDate(date);
        const feeling = entries[dateStr];
        return (
          <div
            key={dateStr}
            style={{
              aspectRatio: "1 / 1",
              background: "#0f172a",
              color: "#e2e8f0",
              fontSize: 11,
              borderRadius: 8,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: feeling ? "1px solid #ec4899" : "1px solid #1e293b",
            }}
          >
            <div style={{ fontSize: 10 }}>
              {date.getDate().toString().padStart(2, "0")}
            </div>
            <div style={{ fontSize: 16 }}>
              {feeling ? emojiMap[feeling] || "❤️" : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}
