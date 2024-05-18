"use client";

import Button from "@/components/global/Button";
import { Log, LogHistory } from "@/schema/GameFeedSchema";
import { z } from "zod";
import { yahtzeeClient } from "@/utils/axiosClients";
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

type LogSchema = z.infer<typeof Log>;
type GameFeedSchema = z.infer<typeof LogHistory>;

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
  const pathname = usePathname();

  const diceRoll = () => {
    const randomNum = Math.random() * (6 - 1) + 1;
    return Math.round(randomNum);
  };

  const rollOpenDice = () => {
    let roll = [];
    for (let die of dice) {
      if (die["open"]) {
        const newDiceValue = diceRoll();
        die.set(newDiceValue);
        roll.push(newDiceValue);
      } else {
        roll.push(die.value);
      }
    }
    setRollsRemaining(rollsRemaining - 1);
    const log: LogSchema = {
      log_time: Date.now() / 1000,
      type: "roll",
      category: "",
      value: roll,
    };
    if (pathname === "/play/guest") {
      const tempGameFeed = { ...gameFeed };
      tempGameFeed.logs.push(log);
      setGameFeed(tempGameFeed);
    } else {
      yahtzeeClient.put(`/add-log/${gameFeed._id}`, log).then((response) => {
        const logHistory = response.data;
        setGameFeed(logHistory);
      });
    }
  };

  const checkGameFeed = useCallback(() => {
    let logIndex = gameFeed.logs.length - 1;
    let log = gameFeed.logs[logIndex];
    if (logIndex > 0) {
      if (log.type === "roll") {
        dice.map((die, index) => {
          die.set(log.value[index]);
        });
      }
      let remainingRolls = 3;
      while (log && log.type === "roll" && remainingRolls !== 0) {
        remainingRolls -= 1;
        logIndex -= 1;
        log = gameFeed.logs[logIndex];
      }
      setRollsRemaining(remainingRolls);
    }
  }, [dice, setRollsRemaining, gameFeed]);

  useEffect(() => {
    if (gameFeed.logs) {
      checkGameFeed();
    }
  }, [gameFeed, checkGameFeed]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-end p-5">
      {rollsRemaining ?
        <Button clickHandler={rollOpenDice} content="Roll" style="score" />
        : null
      }
     <div className="w-full mt-10 flex justify-center gap-[10%] text-xl">
        {dice.map((die) =>
          die.open ? (
            <button
              key={die.name}
              onClick={die.changeStatus}
              className="bg-white text-black border-4 border-black py-3 px-4 rounded-xl hover:bg-black hover:text-white shadow-dark"
            >
              {die.value}
            </button>
          ) : (
            <button
              key={die.name}
              className="bg-white text-black border-black -translate-y-3 font-bold py-3 px-4 border-4 rounded-xl hover:bg-black hover:text-white shadow-dark"
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
