'use client'

import { useState } from "react"
import Button from "@/app/(game)/_components/Button";



export default function DiceRoller({dice, rollsRemaining, setRollsRemaining}) {

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



  const rollButtonProps = {name: "Roll", style: "large"}


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
      </div>
    </div>
  )
}
