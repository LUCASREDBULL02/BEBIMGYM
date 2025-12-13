// src/hooks/useCycleLog.js
import { useState, useEffect } from "react";

export default function useCycleLog() {
  const [entries, setEntries] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("cycle-feelings");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  function logFeeling(dateStr, feeling) {
    const updated = { ...entries, [dateStr]: feeling };
    setEntries(updated);
    localStorage.setItem("cycle-feelings", JSON.stringify(updated));
  }

  return { entries, logFeeling };
}
