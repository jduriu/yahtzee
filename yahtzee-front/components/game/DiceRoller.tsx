"use client";

import Button from "@/components/global/Button";
import { Log, LogHistory } from "@/schema/GameFeedSchema";
import { z } from 'zod';
import { yahtzeeClient } from "@/utils/axiosClients";
import { useCallback, useEffect } from "react";

type LogSchema = z.infer<typeof Log>
type GameFeedSchema = z.infer<typeof LogHistory>

interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
  changeStatus: () => void;
}
interface DiceRollerProps {
  dice: Dice[];
  rollsRemaining: number;
  setRollsRemaining: React.Dispatch<React.SetStateAction<number>>;
  gameFeed: GameFeedSchema;
  setGameFeed: React.Dispatch<React.SetStateAction<GameFeedSchema>>;
}

export default function DiceRoller({
  dice,
  rollsRemaining,
  setRollsRemaining,
  gameFeed,
  setGameFeed,
}: DiceRollerProps) {

  const diceRoll = () => {
    const randomNum = Math.random() * (6 - 1) + 1;
    return Math.round(randomNum);
  };

  const rollOpenDice = () => {
    let roll = []
    for (let die of dice) {
      if (die["open"]) {
        const newDiceValue = diceRoll();
        die.set(newDiceValue);
        roll.push(newDiceValue)
      } else {
        roll.push(die.value)
      }
    }
    setRollsRemaining(rollsRemaining - 1);
    const log: LogSchema  = {
      log_time: 0.0,
      type: "roll",
      category: "",
      value: roll,
    }
    yahtzeeClient
      .put(`/add-log/${gameFeed._id}`, log)
      .then((response) => {
        const logHistory = response.data
        setGameFeed(logHistory);
      })
  };

  const checkGameFeed = useCallback(() => {
    let logIndex = gameFeed.logs.length - 1
    let log = gameFeed.logs[logIndex]

    if (logIndex > 0) {
      if (log.type === 'roll') {
        dice.map((die, index) => {
          die.set(log.value[index])
        })
      }

      let remainingRolls = 3

      while (log.type === 'roll' && remainingRolls !== 0) {
        remainingRolls -= 1
        logIndex -= 1
        log = gameFeed.logs[logIndex]
      }
      setRollsRemaining(remainingRolls)
    }
  }, [dice, setRollsRemaining, gameFeed])

  useEffect(() => {
    if (gameFeed.logs) {
      checkGameFeed()
    }
  }, [gameFeed, checkGameFeed])

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-5">
      <div className="self-start">Rolls Remaining: {rollsRemaining}</div>
      {rollsRemaining ? (
        <Button clickHandler={rollOpenDice} content="Roll" style="score" />
      ) : null}
      <div className="w-full h-[100px] flex items-center justify-center gap-20 text-xl">
        {dice.map((die) =>
          die.open ? (
            <button key={die.name} onClick={die.changeStatus}>
              {die.value}
            </button>
          ) : (
            <button
            key={die.name}
            className="-translate-y-3 font-bold"
            onClick={die.changeStatus}
            >
              {die.value}
            </button>
          )
        )}
      </div>
    </div>
  );
}
