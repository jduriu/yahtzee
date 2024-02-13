'use client'

import { useState, useEffect } from "react"

interface Dice {
  name: string;
  value: number;
  setter: (num: number) => void;
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
      "setter": (num: number) => setDiceOne(num),
      "open": true
    },
    {
      "name": "d2",
      "value": diceTwo,
      "setter": (num: number) => setDiceOne(num),
      "open": true
    },
    {
      "name": "d3",
      "value": diceThree,
      "setter": (num: number) => setDiceOne(num),
      "open": true
    },
    {
      "name": "d4",
      "value": diceFour,
      "setter": (num: number) => setDiceOne(num),
      "open": true
    },
    {
      "name": "d5",
      "value": diceFive,
      "setter": (num: number) => setDiceOne(num),
      "open": true
    },
  ]

  const diceRoll = () => {
    const randomNum = Math.random() * (6 - 1) + 1
    return Math.round(randomNum)
  }

  const rollOpenDice = (dice: Dice[]) => {
    dice.map(diceProps => {
      if (diceProps.open) {
        const newDiceValue = diceRoll()
        diceProps.setter(newDiceValue)
      }
    })
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
          <div key={diceProps.name}>{diceProps.value}</div>
        )}
      </div>
      <div>Button</div>
    </div>
  )
}
