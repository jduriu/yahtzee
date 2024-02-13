'use client'

import { useState } from "react"
import Button from "@/app/(game)/_components/Button";

interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
}



export default function DiceRoller() {
  const [diceOne, setDiceOne] = useState(1)
  const [diceTwo, setDiceTwo] = useState(1)
  const [diceThree, setDiceThree] = useState(1)
  const [diceFour, setDiceFour] = useState(1)
  const [diceFive, setDiceFive] = useState(1)
  const dice: Dice[] = [
    {
      "name": "d1",
      "value": diceOne,
      "set": (num: number) => setDiceOne(num),
      "open": true
    },
    {
      "name": "d2",
      "value": diceTwo,
      "set": (num: number) => setDiceTwo(num),
      "open": true
    },
    {
      "name": "d3",
      "value": diceThree,
      "set": (num: number) => setDiceThree(num),
      "open": true
    },
    {
      "name": "d4",
      "value": diceFour,
      "set": (num: number) => setDiceFour(num),
      "open": true
    },
    {
      "name": "d5",
      "value": diceFive,
      "set": (num: number) => setDiceFive(num),
      "open": true
    },
  ]

  const diceRoll = () => {
    const randomNum = Math.random() * (6 - 1) + 1
    return Math.round(randomNum)
  }

  const rollOpenDice = () => {
    for (let die of dice) {
      if (die["open"]) {
        const newDiceValue = diceRoll()
        die.set(newDiceValue)
      }
    }
  }

  const rollButtonProps = {
    name: "Roll",
    style: "small"
  }


  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-5">
      <div className="self-start">Dice Values</div>
      <div
      className="w-full h-[100px]
      flex items-center justify-center
      gap-10"
      >
        {dice.map(diceProps =>
          <div
            key={diceProps.name}
            // className={{}}
          >
            {diceProps.value}
          </div>
        )}
      </div>
      <Button action={rollOpenDice} buttonProps={rollButtonProps}/>
    </div>
  )
}
