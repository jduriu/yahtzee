import React from 'react';
import { Scorecard } from '@/schema/ScorecardSchema';
import { z } from 'zod';

type ScorecardSchema = z.infer<typeof Scorecard>
interface GameFeedProps {
  scorecard: ScorecardSchema
  gameFeed: {};
}

const CategoryNameMap = {
  ones: "Ones",
  twos: "Twos",
  threes: "Threes",
  fours: "Fours",
  fives: "Fives",
  sixes: "Sixes",
  bonus: "Bonus",
  three_of_kind: "Three of a Kind",
  four_of_kind: "Four of a Kind",
  full_house: "Full House",
  sm_straight: "Small Straight",
  lg_straight: "Large Straight",
  yahtzee: "Yahtzee",
  chance: "Chance",
  yahtzee_bonus: "Yahtzee Bonus",
}

const GameFeed = ({ user, gameFeed }: GameFeedProps) => {
  const processLogs = (log, index) => {
    if (log.type === 'score') {
      return (
        <div key={index}>{`... ${user.username} scored ${log.value} on ${CategoryNameMap[log.category]}`}</div>
      )
    }
    if (log.type === 'roll') {

      return (
        <div key={index}>{`... ${user.username} rolled ${log.value}`}</div>
      )
    }
    if (log.type === 'turn') {
      return (
        <div key={index}>{`... ${user.username} has started a new turn.`}</div>
      )
    }
  }

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl pb-4">Game History</h1>
      <div className="flex flex-col gap-1">
        {gameFeed.logs &&
          gameFeed.logs.map((log, index) => (
            processLogs(log, index)
          ))
        }
      </div>
    </div>
  )
};

export default GameFeed;
