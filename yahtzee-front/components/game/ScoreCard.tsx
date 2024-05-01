import React from "react";
import { Scorecard } from "@/schema/ScorecardSchema";
import { z } from 'zod';
import Tooltip from '@mui/material/Tooltip';

type ScorecardSchema = z.infer<typeof Scorecard>
type ScoreCardProps = {
  scorecard: ScorecardSchema
}

const ScoreCard = ({ scorecard }: ScoreCardProps) => {
  const upperSection = [
    {name: "Ones", value: scorecard.ones, tooltip: "Total of Aces only" },
    {name: "Twos", value: scorecard.twos, tooltip: "Total of Twos only" },
    {name: "Threes", value: scorecard.threes, tooltip: "Total of Threes only" },
    {name: "Fours", value: scorecard.fours, tooltip: "Total of Fours only" },
    {name: "Fives", value: scorecard.fives, tooltip: "Total of Fives only" },
    {name: "Sixes", value: scorecard.sixes, tooltip: "Total of Sixes only" },
    {name: "Bonus", value: scorecard.bonus, tooltip: "If Upper Section total exceeds 63 add 35 additional points" },
  ]
  const lowerSection = [
    {name: "Three of a Kind", value: scorecard.three_of_kind, tooltip: "Total of all 5 dice"},
    {name: "Four of a Kind", value: scorecard.four_of_kind, tooltip: "Total of all 5 dice"},
    {name: "Full House", value: scorecard.full_house, tooltip: "25 points"},
    {name: "Small Straight", value: scorecard.sm_straight, tooltip: "30 points"},
    {name: "Large Straight", value: scorecard.lg_straight, tooltip: "40 points"},
    {name: "Yahtzee", value: scorecard.yahtzee, tooltip: "50 points"},
    {name: "Chance", value: scorecard.chance, tooltip: "Total of all 5 dice"},
    {name: "Yahtzee Bonus", value: scorecard.yahtzee_bonus, tooltip: ""},
  ]

  const upperTotal = upperSection.reduce((accumulator, category) => {
    return accumulator + (category.value || 0);
  }, 0);

  const lowerTotal = lowerSection.reduce((accumulator, category) => {
    if (category.name === "Yahtzee Bonus") {
      return accumulator + (category.value * 100)
    } else {
      return accumulator + (category.value || 0);
    }
  }, 0)

  const grandTotal = upperTotal + lowerTotal


  return (
    <div className="w-full h-full px-10 py-5 text-md overflow-y-scroll border border-black bg-white text-black shadow-xl">
      <div className="text-3xl py-3">SCORE CARD</div>
      <div className="text-2xl pb-2">Upper Section</div>
      {upperSection.map(category => (
        <div key={category.name} className="w-full border flex h-10 items-center bg-gray-50">
          <Tooltip title={category.tooltip}>
            <div className="w-[90%] pl-5">
                {category.name}
            </div>
          </Tooltip>
          <div className="w-[10%] border-l flex items-center justify-center">{category.value ? category.value : '-'}</div>
        </div>
      ))}
      <div className="w-full border flex h-10 items-center text-lg bg-gray-100">
        <div className="w-[90%] pl-5">Upper Total</div>
        <div className="w-[10%] border-l flex items-center justify-center">{upperTotal}</div>
      </div>
      <div className="text-2xl py-2">Lower Section</div>
      {lowerSection.map(category => (
        <div key={category.name} className="w-full border flex h-10 items-center bg-gray-50">
          <Tooltip title={category.tooltip}>
            <div className="w-[90%] pl-5">
                {category.name}
            </div>
          </Tooltip>
          <div className="w-[10%] border-l flex items-center justify-center">{category.value ? category.value : '-'}</div>
        </div>
      ))}
      <div className="w-full border flex h-10 items-center text-lg bg-gray-100">
        <div className="w-[90%] pl-5">Lower Total</div>
        <div className="w-[10%] border-l flex items-center justify-center">{lowerTotal}</div>
      </div>
      <div className="w-full border flex h-10 items-center text-lg bg-gray-300 mt-5">
        <div className="w-[90%] pl-5">Grand Total</div>
        <div className="w-[10%] border-l flex items-center justify-center">{grandTotal}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
