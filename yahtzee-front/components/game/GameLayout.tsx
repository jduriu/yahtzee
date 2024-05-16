import React, { useState } from "react";
import DiceBoard from "./DiceBoard";
import ScoreCard from "./ScoreCard";

const GameLayout = () => {
  const [scorecard, setScorecard] = useState({})

  const ScorecardHighlight = () => {
    return (
      <div className="w-full h-full relative">
        {/* <div id="Top Left" className="absolute left-0 w-1/2 h-1/2 backdrop-blur-sm"></div>
        <div id="Bottom Left" className="absolute left-0 bottom-0 w-1/2 h-1/2 backdrop-blur-sm"></div> */}
        <div id="Right Half" className="absolute left-0 w-1/2 h-full backdrop-blur-sm rounded-xl flex justify-center items-center">
          <div className="p-10 border-2 border-black flex justify-center items-center bg-white text-black rounded-xl">
            This is the scorecard!
          </div>
        </div>
        <div id="Right Half" className="pt-[90px] absolute right-0 w-1/2 h-full p-5 border-4 border-red-500 rounded-xl flex flex-col items-end justify-end">

        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full absolute flex gap-10 p-5 ">
        <div className="w-1/2 h-full ">
          <DiceBoard scorecard={scorecard} setScorecard={setScorecard} />
        </div>
        <div className="w-1/2 h-full ">
          <ScoreCard scorecard={scorecard} />
        </div>
      </div>
      <ScorecardHighlight/>
    </div>
  )
};

export default GameLayout;
