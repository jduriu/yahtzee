import React from "react";
import { Scorecard } from "@/schema/ScorecardSchema";
import { z } from 'zod';
import Tooltip from '@mui/material/Tooltip';

type ScorecardSchema = z.infer<typeof Scorecard>
interface ScoreCardProps {
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

  const scorecardSections = [
    {name: "Upper", content: upperSection, total: upperTotal},
    {name: "Lower", content: lowerSection, total: lowerTotal}
  ]

  return (
    <div className="w-full h-full p-10 py-7 text-md overflow-y-auto bg-gray-800 shadow-dark rounded-3xl">
      <div className="text-3xl pb-2">SCORE CARD</div>
      {scorecardSections.map(section => (
        <div key={section.name}>
          <div className="text-2xl py-3">{section.name} Section</div>
          {section.content.map(category => (
            <div key={category.name} className="mx-5 border border-black flex h-8 items-center bg-gray-600">
              <Tooltip title={category.tooltip}>
                <div className="w-[90%] pl-5">
                  {category.name}
                </div>
              </Tooltip>
              <div className="w-[10%] border-l border-black flex items-center justify-center">
                {category.value !== null ? category.value : '-'}
              </div>
            </div>
          ))}
          <div className="mx-5 border border-black flex h-8 items-center text-lg bg-gray-700">
            <div className="w-[90%] pl-5">{section.name} Total</div>
            <div className="w-[10%] border-l border-black flex items-center justify-center">{section.total}</div>
          </div>
        </div>
      ))}
      <div className="w-full border border-black flex h-8 items-center text-xl bg-gray-950 mt-5">
        <div className="w-[90%] pl-5 ">Grand Total</div>
        <div className="w-[10%] border-l border-black flex items-center justify-center">{grandTotal}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
