"use client"

import StartForm from "@/components/game/StartForm";
import { useState } from "react";

export default function Start() {
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {mode ? <div>Game Creator</div> : <StartForm setMode={setMode} />}
    </div>
  );
}
