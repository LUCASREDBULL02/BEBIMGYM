import React, { useState, useEffect } from "react";
import { EXERCISES } from "../data/exercises";
import { logCycleFeedback } from "./CycleTracker";

export default function LogModal({ onClose, onLog }) {
  const [exerciseId, setExerciseId] = useState("bench");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({
    strength: "",
    mood: "",
    energy: "",
  });

  const handleSubmit = () => {
    if (!exerciseId || !weight || !reps) return;

    const entry = {
      id: crypto.randomUUID(),
      exerciseId,
      weight: Number(weight),
      reps: Number(reps),
      date,
    };

    onLog && onLog(entry);
    setWeight("");
    setReps("");
  };

  const handleCompleteDay = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = () => {
    logCycleFeedback(date, feedback);
    setShowFeedbackForm(false);
    alert("Tack! Dagen har loggats i kalendern.");
  };

  return (
    <div className="modal">
      <h2>Logga Pass</h2>

      <div>
        <label>Övning:</label>
        <select value={exerciseId} onChange={(e) => setExerciseId(e.target.value)}>
          {EXERCISES.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Vikt (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div>
        <label>Reps:</label>
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
      </div>

      <div>
        <label>Datum:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button onClick={handleSubmit}>+ Logga set</button>

      <button
        onClick={handleCompleteDay}
        style={{ backgroundColor: "#ec4899", color: "white", marginTop: 12 }}
      >
        ✅ Klar för dagen
      </button>

      {showFeedbackForm && (
        <div className="feedback-form" style={{ marginTop: 16 }}>
          <h4>Hur kände du dig idag?</h4>

          <div>
            <label>Styrka:</label>
            <select
              value={feedback.strength}
              onChange={(e) => setFeedback({ ...feedback, strength: e.target.value })}
            >
              <option value="">Välj</option>
              <option value="💪 Stark">💪 Stark</option>
              <option value="😐 Okej">😐 Okej</option>
              <option value="😩 Svag">😩 Svag</option>
            </select>
          </div>

          <div>
            <label>Mentalt:</label>
            <select
              value={feedback.mood}
              onChange={(e) => setFeedback({ ...feedback, mood: e.target.value })}
            >
              <option value="">Välj</option>
              <option value="😊 Glad">😊 Glad</option>
              <option value="😐 Okej">😐 Okej</option>
              <option value="😔 Låg">😔 Låg</option>
            </select>
          </div>

          <div>
            <label>Energi:</label>
            <select
              value={feedback.energy}
              onChange={(e) => setFeedback({ ...feedback, energy: e.target.value })}
            >
              <option value="">Välj</option>
              <option value="⚡️ Hög">⚡️ Hög</option>
              <option value="🙂 Normal">🙂 Normal</option>
              <option value="😴 Låg">😴 Låg</option>
            </select>
          </div>

          <button onClick={handleFeedbackSubmit} style={{ marginTop: 8 }}>
            Spara dagens känsla
          </button>
        </div>
      )}

      <button onClick={onClose} style={{ marginTop: 12 }}>
        Stäng
      </button>
    </div>
  );
}
