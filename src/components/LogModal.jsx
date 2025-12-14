// === LogModal.jsx ===
import React, { useState } from "react";

const FEELING_OPTIONS = {
  strength: ["Svag", "Normal", "Stark"],
  mental: ["Låg", "Okej", "Glad"],
  energy: ["Trött", "Normal", "Full energi"],
};

export default function LogModal({ onClose }) {
  const [showFeelingForm, setShowFeelingForm] = useState(false);
  const [feelings, setFeelings] = useState({
    strength: "",
    mental: "",
    energy: "",
  });

  const todayStr = new Date().toISOString().split("T")[0];

  const saveFeelings = () => {
    const existing = JSON.parse(localStorage.getItem("cycleFeelings") || "{}");
    existing[todayStr] = feelings;
    localStorage.setItem("cycleFeelings", JSON.stringify(existing));
    setShowFeelingForm(false);
    alert("Dagens känsla loggad och sparad!");
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Innehåll för att logga pass, formulär mm... */}

      {/* Klar för dagen-knapp */}
      {!showFeelingForm && (
        <button
          onClick={() => setShowFeelingForm(true)}
          style={{ marginTop: 20, padding: 10, borderRadius: 8 }}
        >
          Klar för dagen
        </button>
      )}

      {showFeelingForm && (
        <div style={{ marginTop: 20 }}>
          <h4>Hur kände du dig idag?</h4>
          {Object.entries(FEELING_OPTIONS).map(([key, options]) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <label style={{ fontWeight: 600 }}>{key}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setFeelings((prev) => ({ ...prev, [key]: opt }))
                    }
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      background:
                        feelings[key] === opt ? "#ec4899" : "#1e293b",
                      color: "white",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={saveFeelings}
            style={{ marginTop: 10, padding: 8, background: "#22c55e", color: "white", borderRadius: 6 }}
          >
            Spara dagens känsla
          </button>
        </div>
      )}

      <button onClick={onClose} style={{ marginTop: 20 }}>Stäng</button>
    </div>
  );
}
