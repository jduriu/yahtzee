import React from "react";
import Button from "@/components/global/Button";

type ForwardBackButtonsProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const ForwardBackButtons = ({ step, setStep }: ForwardBackButtonsProps) => {
  return (
    <div className="h-[10%] flex justify-between py-3 px-10">
      <Button
        clickHandler={() => setStep(step - 1)}
        content="Back"
        style="large"
      />
      <Button
        clickHandler={() => setStep(step + 1)}
        content="Next"
        style="large"
      />
    </div>
  );
};

export default ForwardBackButtons;
