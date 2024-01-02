'use client'

import { useState, useEffect } from "react"

export default function DiceRoller() {

  const diceRoll = () => {
    const randomNum = Math.random() * (6 - 1) + 1
    return Math.round(randomNum)
  }

  useEffect(() => {
    setDiceOne(diceRoll)
    setDiceTwo(diceRoll)
    setDiceThree(diceRoll)
    setDiceFour(diceRoll)
    setDiceFive(diceRoll)
  }, [])

  const [diceOne, setDiceOne] = useState(0)
  const [diceTwo, setDiceTwo] = useState(0)
  const [diceThree, setDiceThree] = useState(0)
  const [diceFour, setDiceFour] = useState(0)
  const [diceFive, setDiceFive] = useState(0)




  return (
    <div
    className="w-full h-full
    border-2 border-blue-500
    flex items-center justify-center
    gap-10"
    >
      <div>{diceOne}</div>
      <div>{diceTwo}</div>
      <div>{diceThree}</div>
      <div>{diceFour}</div>
      <div>{diceFive}</div>
    </div>
  )
}
