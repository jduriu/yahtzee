import React from 'react';
import { z } from 'zod';
import { LogHistory, Log } from '@/schema/GameFeedSchema';
import { User } from '@/schema/UserSchema';
import { getTime } from '@/utils/processDate';

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

  const getLogs = () => {
    if (gameFeed.logs.length > 10) {
      const logsLength =  gameFeed.logs.length
      return gameFeed.logs.slice(logsLength - 10, logsLength)
    }
    return gameFeed.logs
  }


  const processLogs = (log: LogSchema, index: number) => {
    return (
      <div key={index} className="flex justify-between">
        {log.type === 'score' ?
          <div>{`... ${user.username} scored ${log.value} on ${CategoryNameMap[log.category]}`}</div>
        :
          <div >{`... ${user.username} rolled ${log.value}`}</div>
        }
        <div>{getTime(log.log_time)}</div>
      </div>
    )
  };

  return (
    <div className="w-full h-1/2 px-10 py-7 shadow-dark bg-gray-800 rounded-3xl">
      <h1 className="h-[15%] text-3xl">Game Feed</h1>
      <div className=" h-[85%] flex flex-col gap-1 overflow-y-auto px-5">
        {gameFeed.logs &&
          getLogs().map((log: LogSchema, index: number) => (
            processLogs(log, index)
          ))
        }
      </div>

    </div>
  )
};

export default GameFeed;
