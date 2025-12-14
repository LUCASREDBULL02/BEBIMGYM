// CycleTracker.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FEEDBACK_KEY = "cycleFeedback";

const getStoredFeedback = () => {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || {};
  } catch {
    return {};
  }
};

const saveFeedback = (data) => {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
};

const moodIcons = {
  strength: {
    strong: "💪",
    normal: "🙂",
    weak: "😩",
  },
  mental: {
    sharp: "🧠",
    foggy: "🌫️",
    stressed: "😰",
  },
  energy: {
    energetic: "⚡",
    ok: "😐",
    tired: "😴",
  },
};

const getIconSummary = (entry) => {
  if (!entry) return "";
  const { strength, mental, energy } = entry;
  return `${moodIcons.strength[strength] || ""} ${moodIcons.mental[mental] || ""} ${moodIcons.energy[energy] || ""}`;
};

export default function CycleTracker() {
  const [feedbackMap, setFeedbackMap] = useState(getStoredFeedback());

  useEffect(() => {
    saveFeedback(feedbackMap);
  }, [feedbackMap]);

  const tileContent = ({ date }) => {
    const key = date.toISOString().slice(0, 10);
    const entry = feedbackMap[key];
    if (!entry) return null;
    return (
      <div style={{ fontSize: 12, textAlign: "center" }}>
        {getIconSummary(entry)}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>Cykelkalender</h2>
      <Calendar
        tileContent={tileContent}
        calendarType="ISO 8601"
        locale="sv-SE"
      />
    </div>
  );
}

export function logCycleFeedback({ date, strength, mental, energy }) {
  const all = getStoredFeedback();
  const key = date.toISOString().slice(0, 10);
  all[key] = { strength, mental, energy };
  saveFeedback(all);
} 
