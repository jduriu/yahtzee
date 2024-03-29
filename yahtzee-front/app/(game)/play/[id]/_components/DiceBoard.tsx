import DiceRoller from "./_diceBoardComps/DiceRoller"
import ScoreRecorder from "./_diceBoardComps/ScoreRecorder";
import { useState } from 'react'

export default function DiceBoard({scorecard}) {

  interface Dice {
    name: string;
    value: number;
    set: (num: number) => void;
    open: boolean;
    changeStatus: () => void;
  }

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-1/3">
        <DiceRoller dice={dice} rollsRemaining={rollsRemaining} setRollsRemaining={setRollsRemaining}/>
      </div>
      <div className="h-1/3">
        <div>Score Estimates</div>
      </div>
      <div className="h-1/3">
        <ScoreRecorder scorecard={scorecard}/>
      </div>
    </div>

  )
}
