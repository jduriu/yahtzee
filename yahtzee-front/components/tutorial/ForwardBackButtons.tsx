import React from "react";
import Button from "@/components/global/Button";
import { useRouter } from 'next/navigation'

interface ForwardBackButtonsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const ForwardBackButtons = ({ step, setStep }: ForwardBackButtonsProps) => {

  const router = useRouter()

  return (
    <div className="h-[10%] flex justify-between py-3 px-10">
      <Button
        clickHandler={() => setStep(step - 1)}
        content="Back"
        style="large"
      />
      {step < 5 ?
        <Button
          clickHandler={() => setStep(step + 1)}
          content="Next"
          style="large"
        />
        :
        <Button
          clickHandler={() => router.replace('/dashboard')}
          content="Finish"
          style="large"
        />
    }
    </div>
  );
};

export default ForwardBackButtons;
