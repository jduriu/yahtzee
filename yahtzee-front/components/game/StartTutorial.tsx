import React, { SetStateAction } from "react";
import Button from "@/components/global/Button";

type StartTutorialProps = {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
};

const StartTutorial = ({ step, setStep }: StartTutorialProps) => {
  return (
    <div className="h-full flex flex-col gap-3 items-center justify-center">
      <div>Lets Get Started!</div>
      <Button
        clickHandler={() => setStep(step + 1)}
        content="Click Here"
        style="submit"
      />
    </div>
  );
};

export default StartTutorial;
