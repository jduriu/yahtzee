"use client"

import React, { useState } from "react";
import StartTutorial from "@/components/game/StartTutorial";
import ForwardBackButtons from "@/components/game/ForwardBackButtons";
import GameLayout from "@/components/game/GameLayout";

/*
Step sequence:
  - Lets get started
  - Overall layout
  -
*/

const Tutorial = () => {
  const [step, setStep] = useState(0);

  const components = [
    <StartTutorial key={0} step={step} setStep={setStep} />,
    <GameLayout key={1} />,
  ];

  return (
    <div className="w-full h-full flex flex-col p-5">
      <div className={step > 0 ? "h-full" : "h-[90%]"}>
        {components.map((component, index) => index === step && component)}
      </div>
      {step > 0 && <ForwardBackButtons step={step} setStep={setStep} />}
    </div>
  );
};

export default Tutorial;
