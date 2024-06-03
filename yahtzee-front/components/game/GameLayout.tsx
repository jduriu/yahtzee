import React, { useState } from "react";
import { z } from 'zod';
import DiceBoard from "./DiceBoard";
import ScoreCard from "./ScoreCard";
import GameFeed from "./GameFeed";
import { User } from "@/schema/UserSchema";
import { Scorecard } from "@/schema/ScorecardSchema";
import { LogHistory } from "@/schema/GameFeedSchema";

type UserSchema = z.infer<typeof User>
type ScorecardSchema = z.infer<typeof Scorecard>
type GameFeedSchema = z.infer<typeof LogHistory>

const GameLayout = () => {
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

  // const ScorecardHighlight = () => {
  //   return (
  //     <div className="w-full h-full relative">
  //       {/* <div id="Top Left" className="absolute left-0 w-1/2 h-1/2 backdrop-blur-sm"></div>
  //       <div id="Bottom Left" className="absolute left-0 bottom-0 w-1/2 h-1/2 backdrop-blur-sm"></div> */}
  //       <div id="Right Half" className="absolute left-0 w-1/2 h-full backdrop-blur-sm rounded-xl flex justify-center items-center">
  //         <div className="p-10 border-2 border-black flex justify-center items-center bg-white text-black rounded-xl">
  //           This is the scorecard!
  //         </div>
  //       </div>
  //       <div id="Right Half" className="pt-[90px] absolute right-0 w-1/2 h-full p-5 border-4 border-red-500 rounded-xl flex flex-col items-end justify-end">

  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full absolute flex gap-10 p-5 ">
        <div className="w-1/2 h-full flex flex-col gap-5">
          <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
          <GameFeed user={user} gameFeed={gameFeed} />
        </div>
        <div className="w-1/2 h-full ">
          <ScoreCard scorecard={scorecard} />
        </div>
      </div>
      {/* <ScorecardHighlight/> */}
    </div>
  )
};

export default GameLayout;
