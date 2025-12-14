// src/components/LogModal.jsx
import React, { useState } from "react";
import { EXERCISES } from "../data/exercises";

export default function LogModal({ onClose, onSave }) {
  const [exerciseId, setExerciseId] = useState(EXERCISES[0]?.id || "");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");

  const moods = ["Stark", "Trött", "Neutral", "Stressad", "Energiskt"];

  const handleSave = () => {
    if (!exerciseId || !weight || !reps) return;

    const log = {
      id: crypto.randomUUID?.() || Math.random().toString(36),
      exerciseId,
      weight: Number(weight),
      reps: Number(reps),
      date,
    };

    onSave?.(log);

    // Töm fält
    setWeight("");
    setReps("");
  };

  const handleDayComplete = () => {
    setShowMoodPrompt(true);
  };

  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem("cycleFeedback") || "{}");
    stored[today] = selectedMood;
    localStorage.setItem("cycleFeedback", JSON.stringify(stored));

    setShowMoodPrompt(false);
    setSelectedMood("");
    alert("Tack! Din känsla har sparats i kalendern.");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Logga ett pass</h2>

        <label>Övning</label>
        <select
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
        >
          {EXERCISES.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <label>Vikt (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <label>Reps</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <label>Datum</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSave}>💾 Spara pass</button>

        <hr style={{ margin: "12px 0" }} />

        <button
          style={{
            background: "#ec4899",
            color: "#0f172a",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            fontWeight: "bold",
          }}
          onClick={handleDayComplete}
        >
          ✅ Klar för dagen
        </button>

        {showMoodPrompt && (
          <div style={{ marginTop: 12 }}>
            <p>Hur kände du dig idag?</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  style={{
                    padding: "6px 10px",
                    background:
                      selectedMood === mood ? "#ec4899" : "#1f2937",
                    color: selectedMood === mood ? "#0f172a" : "#e5e7eb",
                    border: "1px solid #ec4899",
                    borderRadius: 999,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {mood}
                </button>
              ))}
            </div>
            <button
              onClick={handleMoodSubmit}
              style={{
                marginTop: 10,
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                background: "#10b981",
                color: "#fff",
                fontSize: 12,
              }}
            >
              Spara känsla
            </button>
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: 12 }}>
          Stäng
        </button>
      </div>
    </div>
  );
}
