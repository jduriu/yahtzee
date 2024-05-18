"use client";

import { useState } from "react";
import DiceBoard from "@/components/game/DiceBoard";
import ScoreCard from "@/components/game/ScoreCard";
import GameFeed from "@/components/game/GameFeed";
import { z } from 'zod';
import { User } from '@/schema/UserSchema';
import { Scorecard } from "@/schema/ScorecardSchema";
import { LogHistory } from "@/schema/GameFeedSchema";

type UserSchema = z.infer<typeof User>
type ScorecardSchema = z.infer<typeof Scorecard>
type GameFeedSchema = z.infer<typeof LogHistory>


export default function Play() {
  const user: UserSchema = {
    user_id: "guest",
    username: "Guest",
  }
  const [scorecard, setScorecard] = useState({
    _id: "",
    user_id: "",
    player_order_id: 0,
    game_id: "",
    scored: [""],
    bonus: null,
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    three_of_kind: null,
    four_of_kind: null,
    full_house: null,
    sm_straight: null,
    lg_straight: null,
    yahtzee: null,
    chance: null,
    yahtzee_bonus: null,
  } as ScorecardSchema);
  const [gameFeed, setGameFeed] = useState({
    _id: "guestScorecard",
    scorecard_id: "guest",
    logs: [],
  } as GameFeedSchema);

  return (
    <div className="w-full h-full flex gap-10 px-10 py-2">
      <div className="w-1/2 h-full flex flex-col justify-between gap-5">
        <DiceBoard
          scorecard={scorecard}
          setScorecard={setScorecard}
          gameFeed={gameFeed}
          setGameFeed={setGameFeed}
        />
        <GameFeed user={user} gameFeed={gameFeed}/>
      </div>
      <div className="w-1/2 h-full ">
        <ScoreCard scorecard={scorecard} />
      </div>
    </div>
  );
}
