import React from "react";
import DiceRoller from "./DiceRoller";
import { useState } from "react";
import ScoreButtons from "./ScoreButtons";
import processDice from "@/utils/processDice";
import { errorHandler } from "@/utils/errorUtils";
import { yahtzeeClient } from "@/utils/axiosClients";
import { Scorecard, CategoryKeys } from "@/schema/ScorecardSchema";
import { LogHistory, Log } from "@/schema/GameFeedSchema";
import { z } from 'zod';
import { usePathname } from "next/navigation";

type ScorecardSchema = z.infer<typeof Scorecard>
type LogHistorySchema = z.infer<typeof LogHistory>
type LogSchema = z.infer<typeof Log>
type Categories = z.infer<typeof CategoryKeys>

interface DiceBoardProps {
  scorecard: ScorecardSchema;
  setScorecard: React.Dispatch<React.SetStateAction<ScorecardSchema>>;
  gameFeed: LogHistorySchema;
  setGameFeed: React.Dispatch<React.SetStateAction<LogHistorySchema>>;
}
interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
  changeStatus: () => void;
}


const DiceBoard = ({ scorecard, setScorecard, gameFeed, setGameFeed }: DiceBoardProps) => {
  const pathname = usePathname();
  const [rollsRemaining, setRollsRemaining] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("" as Categories);
  const [categoryError, setCategoryError] = useState(false);
  const [diceOne, setDiceOne] = useState(0);
  const [diceOneOpen, setDiceOneOpen] = useState(true);
  const [diceTwo, setDiceTwo] = useState(0);
  const [diceTwoOpen, setDiceTwoOpen] = useState(true);
  const [diceThree, setDiceThree] = useState(0);
  const [diceThreeOpen, setDiceThreeOpen] = useState(true);
  const [diceFour, setDiceFour] = useState(0);
  const [diceFourOpen, setDiceFourOpen] = useState(true);
  const [diceFive, setDiceFive] = useState(0);
  const [diceFiveOpen, setDiceFiveOpen] = useState(true);
  const dice: Dice[] = [
    {
      name: "d1",
      value: diceOne,
      set: (num: number) => setDiceOne(num),
      open: diceOneOpen,
      changeStatus: () => setDiceOneOpen(!diceOneOpen),
    },
    {
      name: "d2",
      value: diceTwo,
      set: (num: number) => setDiceTwo(num),
      open: diceTwoOpen,
      changeStatus: () => setDiceTwoOpen(!diceTwoOpen),
    },
    {
      name: "d3",
      value: diceThree,
      set: (num: number) => setDiceThree(num),
      open: diceThreeOpen,
      changeStatus: () => setDiceThreeOpen(!diceThreeOpen),
    },
    {
      name: "d4",
      value: diceFour,
      set: (num: number) => setDiceFour(num),
      open: diceFourOpen,
      changeStatus: () => setDiceFourOpen(!diceFourOpen),
    },
    {
      name: "d5",
      value: diceFive,
      set: (num: number) => setDiceFive(num),
      open: diceFiveOpen,
      changeStatus: () => setDiceFiveOpen(!diceFiveOpen),
    },
  ];

  const getTurnsRemaining = () => {
    if (scorecard.scored) {
      return 13 - scorecard.scored.length;
    }
  };

  const startNewTurn = () => {
    setSelectedCategory("" as Categories);
    setDiceOne(1);
    setDiceOneOpen(true);
    setDiceTwo(1);
    setDiceTwoOpen(true);
    setDiceThree(1);
    setDiceThreeOpen(true);
    setDiceFour(1);
    setDiceFourOpen(true);
    setDiceFive(1);
    setDiceFiveOpen(true);
  };


  const recordScore = () => {
    if (!scorecard.scored.includes(selectedCategory) || selectedCategory === 'yahtzee') {
      const scorecardId = scorecard._id;
      const tempScorecard = { ...scorecard };
      const turnValue = processDice(dice, selectedCategory, tempScorecard);
      tempScorecard[selectedCategory] = turnValue;
      tempScorecard.scored.push(selectedCategory);

      const log: LogSchema  = {
        log_time: Date.now() / 1000,
        type: "score",
        category: selectedCategory,
        value: turnValue,
      }

      if (pathname === '/play/guest') {
        setScorecard(tempScorecard)
        const tempGameFeed = {...gameFeed};
        tempGameFeed.logs.push(log)
        setGameFeed(tempGameFeed)
        startNewTurn();
      } else {
        yahtzeeClient
          .put(`/scorecards/${scorecardId}`, tempScorecard)
          .then((response) => {
            if (response.statusText === "OK") {
              const updatedScorecard = response.data;
              setScorecard(updatedScorecard);
              startNewTurn();
            }
          })
          .catch((error) => {
            errorHandler(error);
          });
        yahtzeeClient
          .put(`/add-log/${gameFeed._id}`, log)
          .then((response) => {
            const logHistory = response.data
            setGameFeed(logHistory);
          })
      }
    } else {
      setCategoryError(true)
    }
  };

  return (
    <div className="w-full h-1/2 flex flex-col gap-5 px-10 py-7 shadow-dark bg-gray-800 rounded-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Dice Board</h1>
        <div>Rolls remaining: {rollsRemaining}   </div>
        <div>Turns remaining: {getTurnsRemaining()}</div>
      </div>
      <div className="flex flex-col py-5 gap-[10%]">
        <DiceRoller
          dice={dice}
          rollsRemaining={rollsRemaining}
          setRollsRemaining={setRollsRemaining}
          gameFeed={gameFeed}
          setGameFeed={setGameFeed}
        />
        <ScoreButtons
          setSelectedCategory={setSelectedCategory}
          rollsRemaining={rollsRemaining}
          recordScore={recordScore}
        />
        {/* ADD ERROR HANDLING HERE OR INSIDE ScoreButtons */}
      </div>
    </div>
  );
};

export default DiceBoard;
