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
  const [user, setUser] = useState({
    user_id: "guest",
    username: "Guest",
  } as UserSchema);
  const [scorecard, setScorecard] = useState({
    _id: "",
    user_id: "",
    player_order_id: 0,
    game_id: "",
    scored: [""],
    bonus: 0,
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    three_of_kind: 0,
    four_of_kind: 0,
    full_house: 0,
    sm_straight: 0,
    lg_straight: 0,
    yahtzee: 0,
    chance: 0,
    yahtzee_bonus: 0,
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
