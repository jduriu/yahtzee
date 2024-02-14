'use client'

import { useState } from "react"
import Button from "@/app/(game)/_components/Button";

interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
  changeStatus: () => void;
}

export default function DiceRoller() {
  const [rollsRemaining, setRollsRemaining] = useState(3)
  const [diceOne, setDiceOne] = useState(0)
  const [diceOneOpen, setDiceOneOpen] = useState(true)
  const [diceTwo, setDiceTwo] = useState(0)
  const [diceTwoOpen, setDiceTwoOpen] = useState(true)
  const [diceThree, setDiceThree] = useState(0)
  const [diceThreeOpen, setDiceThreeOpen] = useState(true)
  const [diceFour, setDiceFour] = useState(0)
  const [diceFourOpen, setDiceFourOpen] = useState(true)
  const [diceFive, setDiceFive] = useState(0)
  const [diceFiveOpen, setDiceFiveOpen] = useState(true)
  const dice: Dice[] = [
    {
      "name": "d1",
      "value": diceOne,
      "set": (num: number) => setDiceOne(num),
      "open": diceOneOpen,
      "changeStatus": () => setDiceOneOpen(!diceOneOpen)
    },
    {
      "name": "d2",
      "value": diceTwo,
      "set": (num: number) => setDiceTwo(num),
      "open": diceTwoOpen,
      "changeStatus": () => setDiceTwoOpen(!diceTwoOpen)
    },
    {
      "name": "d3",
      "value": diceThree,
      "set": (num: number) => setDiceThree(num),
      "open": diceThreeOpen,
      "changeStatus": () => setDiceThreeOpen(!diceThreeOpen)
    },
    {
      "name": "d4",
      "value": diceFour,
      "set": (num: number) => setDiceFour(num),
      "open": diceFourOpen,
      "changeStatus": () => setDiceFourOpen(!diceFourOpen)
    },
    {
      "name": "d5",
      "value": diceFive,
      "set": (num: number) => setDiceFive(num),
      "open": diceFiveOpen,
      "changeStatus": () => setDiceFiveOpen(!diceFiveOpen)
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
    setRollsRemaining(rollsRemaining - 1)
  }

  const recordScore = () => {
    // Send POST request to yahtzee api to record turn
    return
  }


  const rollButtonProps = {name: "Roll", style: "large"}
  const scoreButtonProps = {name: "Score", style: "small"}


  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-5">
      <div className="self-start">Rolls Remaining: {rollsRemaining}</div>
      <div className="w-full h-[100px] flex items-center justify-center gap-20 text-xl">
        {dice.map(die =>
          die.open ?
            <button key={die.name} onClick={die.changeStatus}>
              {die.value}
            </button>
          :
            <button key={die.name} className="-translate-y-3 font-bold" onClick={die.changeStatus}>
              {die.value}
            </button>
        )}
      </div>
      <div className="w-full flex gap-10 items-center justify-center">
        {rollsRemaining ?
          <Button action={rollOpenDice} buttonProps={rollButtonProps}/>
          :
          null
        }
        <Button action={recordScore} buttonProps={scoreButtonProps}/>
      </div>
    </div>
  )
}
