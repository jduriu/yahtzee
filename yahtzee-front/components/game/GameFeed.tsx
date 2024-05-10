import React from 'react';
import { Scorecard } from '@/schema/ScorecardSchema';
import { z } from 'zod';

type ScorecardSchema = z.infer<typeof Scorecard>
interface GameFeedProps {
  scorecard: ScorecardSchema
  gameFeed: {};
}

const GameFeed = ({ scorecard, gameFeed }: GameFeedProps) => {

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl pb-4">Game History</h1>
      <div className="flex flex-col gap-2">
        {gameFeed.logs &&
          gameFeed.logs.map((index, log) => (
            <div key={index}>{log}</div>
          ))
        }
      </div>
    </div>
  )
};

export default GameFeed;
