import React from 'react';
import DropDown from "@/components/global/DropDown";
import Button from "@/components/global/Button";
import { z } from 'zod';
import { CategoryKeys } from '@/schema/ScorecardSchema';

type Categories = z.infer<typeof CategoryKeys>

interface DropDownOption {
  name: string;
  value: Categories;
}

interface DiceButtonsProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<Categories>>;
  rollsRemaining: number;
  recordScore: () => void;
  rollOpenDice: () => void;
}

const DiceButtons = ({
  setSelectedCategory,
  rollsRemaining,
  recordScore,
  rollOpenDice,
}: DiceButtonsProps) => {
  const dropOptions: DropDownOption[] = [
    { name: "Ones", value: "ones" },
    { name: "Twos", value: "twos" },
    { name: "Threes", value: "threes" },
    { name: "Fours", value: "fours" },
    { name: "Fives", value: "fives" },
    { name: "Sixes", value: "sixes" },
    { name: "Three of a Kind", value: "three_of_kind" },
    { name: "Four of a Kind", value: "four_of_kind" },
    { name: "Full House", value: "full_house" },
    { name: "Small Straight", value: "sm_straight" },
    { name: "Large Straight", value: "lg_straight" },
    { name: "Yahtzee", value: "yahtzee" },
    { name: "Chance", value: "chance" },
  ];


  return (
    <div className="h-1/2 w-full flex gap-10 items-center justify-center">
      {rollsRemaining ?
        <Button clickHandler={rollOpenDice} content="Roll" style="score" />
        : null
      }
      {rollsRemaining < 3 && (
        <>
          <Button clickHandler={recordScore} content="Score" style="score" />
          <DropDown
            setSelected={setSelectedCategory}
            options={dropOptions}
          />
        </>
      )}
    </div>
  );
};

export default DiceButtons;
