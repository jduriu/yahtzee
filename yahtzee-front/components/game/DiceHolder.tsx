"use client";

import { Log, LogHistory } from "@/schema/GameFeedSchema";
import { z } from "zod";
import { useCallback, useEffect } from "react";

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
  setRollsRemaining: React.Dispatch<React.SetStateAction<number>>;
  gameFeed: GameFeedSchema;
}

export default function DiceRoller({
  dice,
  setRollsRemaining,
  gameFeed,
}: DiceRollerProps) {


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
    <div className="w-full h-1/2 flex flex-col items-center p-5">
      <div className="w-full flex justify-center gap-[10%] text-xl">
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
              className="bg-gray-400 text-black border-black -translate-y-3 font-bold py-3 px-4 border-4 rounded-xl hover:bg-black hover:text-white shadow-dark"
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
