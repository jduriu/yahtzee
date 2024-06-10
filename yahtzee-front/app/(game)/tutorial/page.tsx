"use client"

import React, { useState } from "react";
import ForwardBackButtons from "@/components/tutorial/ForwardBackButtons";
import StartTutorial from "@/components/tutorial/00_StartTutorial";
import GameLayoutBlurWithModal from "@/components/tutorial/01_GameLayoutBlurWithModal";
import DiceBoardLayout from "@/components/tutorial/02_DiceBoardLayout";
import ScorecardLayout from "@/components/tutorial/03_ScorecardLayout";
import GameFeedTutorial from "@/components/tutorial/04_GameFeedTutorial";
import GameLayout from "@/components/tutorial/05_GameLayout";
import { z } from 'zod';
import { User } from "@/schema/UserSchema";
import { Scorecard } from "@/schema/ScorecardSchema";
import { LogHistory } from "@/schema/GameFeedSchema";

type UserSchema = z.infer<typeof User>
type ScorecardSchema = z.infer<typeof Scorecard>
type GameFeedSchema = z.infer<typeof LogHistory>

interface GameLayoutProps {
  step: number;
}

const Tutorial = () => {
  // Placeholder data structures for tutorial
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
  const [step, setStep] = useState(0);

  const frames = [
    <StartTutorial key={0} step={step} setStep={setStep} />,
    <GameLayoutBlurWithModal key={1} scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed} user={user} />,
    <DiceBoardLayout key={2} scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed} user={user} />,
    <ScorecardLayout key={3} scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed} user={user} />,
    <GameFeedTutorial key={4} scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed} user={user} />,
    <GameLayout key={5} scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed} user={user} />,
  ];

  return (
    <div className="w-full h-full flex flex-col p-5">
      <div className={step > 0 ? "h-full" : "h-[90%]"}>
        {frames.map((component, index) => index === step && component)}
      </div>
      {step > 0 && <ForwardBackButtons step={step} setStep={setStep} />}
    </div>
  );
};

export default Tutorial;
