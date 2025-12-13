// ✅ UPDATED: LogModal.jsx
import React, { useState } from "react";
import useCycleLog from "../hooks/useCycleLog";

export default function LogModal() {
  const { logFeeling } = useCycleLog();
  const [showFeelingPrompt, setShowFeelingPrompt] = useState(false);
  const todayStr = new Date().toISOString().slice(0, 10);

  // ... your existing log state and logic here

  return (
    <div className="modal-content">
      {/* your regular logging inputs and save button */}

      {!showFeelingPrompt ? (
        <button
          onClick={() => setShowFeelingPrompt(true)}
          className="primary-button"
          style={{ marginTop: 16 }}
        >
          ✅ Klar för dagen
        </button>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div className="small" style={{ marginBottom: 6 }}>
            Hur kände du dig idag?
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Stark", "Trött", "Låg energi", "Okej", "Vila"].map((text) => (
              <button
                key={text}
                onClick={() => {
                  logFeeling(todayStr, text);
                  setShowFeelingPrompt(false);
                }}
                className="small-button"
              >
                {getFeelingEmoji(text)} {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getFeelingEmoji(feeling) {
  switch (feeling) {
    case "Stark": return "💪";
    case "Trött": return "😴";
    case "Låg energi": return "😕";
    case "Okej": return "😊";
    case "Vila": return "🚫";
    default: return "❓";
  }
}
