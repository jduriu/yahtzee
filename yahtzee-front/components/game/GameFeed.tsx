import React from 'react';
import { z } from 'zod';
import { LogHistory, Log } from '@/schema/GameFeedSchema';
import { User } from '@/schema/UserSchema';

type LogSchema = z.infer<typeof Log>
type LogHistorySchema = z.infer<typeof LogHistory>
type UserSchema = z.infer<typeof User>

interface GameFeedProps {
  user: UserSchema;
  gameFeed: LogHistorySchema;
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
  const processLogs = (log: LogSchema, index: number) => {
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
    <div className="w-full p-5 overflow-y-auto">
      <div className="h-[73%] flex flex-col gap-1">
        {gameFeed.logs &&
          gameFeed.logs.map((log: LogSchema, index: number) => (
            processLogs(log, index)
          ))
        }
      </div>

    </div>
  )
};

export default GameFeed;
