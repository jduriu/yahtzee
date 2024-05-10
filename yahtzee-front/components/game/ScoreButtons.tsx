import React from 'react';
import DropDown from "@/components/global/DropDown";
import Button from "@/components/global/Button";
import { z } from 'zod';
import { Categories } from '@/schema/ScorecardSchema';

type Categories = z.infer<typeof Categories>
interface ScoreButtonsProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<Categories>>;
  rollsRemaining: number;
  recordScore: () => void;
}

const ScoreButtons = ({
  setSelectedCategory,
  rollsRemaining,
  recordScore,
}: ScoreButtonsProps) => {
  const dropOptions = [
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

  if (rollsRemaining < 3) {
    return (
      <div className="w-full flex gap-10 items-center justify-center">
        <Button clickHandler={recordScore} content="Score" style="score" />
        <DropDown
          setSelected={setSelectedCategory}
          options={dropOptions}
        />
      </div>
    );
  }
};

export default ScoreButtons;
