import DiceRoller from "./_diceBoardComps/DiceRoller"
import { useState } from 'react'
import ScoreButtons from "./_diceBoardComps/ScoreButtons";
import processDice from "@/utils/processDice";
import { errorHandler } from "@/utils/errorUtils";
import { yahtzeeClient } from "@/utils/axiosClients";

interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
  changeStatus: () => void;
}


const DiceBoard = ({scorecard, setScorecard}) => {
  const [rollsRemaining, setRollsRemaining] = useState(3)
  const [selectedCategory, setSelectedCategory] = useState('Select Category')
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

  const getTurnsRemaining = () => {
    if (scorecard.scored) {
      return 13 - scorecard.scored.length
    }
  }

  const startNewTurn = () => {
    setRollsRemaining(3)
    setSelectedCategory('Select Category')
    setDiceOne(0)
    setDiceOneOpen(true)
    setDiceTwo(0)
    setDiceTwoOpen(true)
    setDiceThree(0)
    setDiceThreeOpen(true)
    setDiceFour(0)
    setDiceFourOpen(true)
    setDiceFive(0)
    setDiceFiveOpen(true)
  }

  const recordScore = () => {
    const scorecardId = scorecard._id
    const tempScorecard = {...scorecard}
    const turnValue = processDice(dice, selectedCategory, tempScorecard)
    if (turnValue === "yahtzeeBonus") {
      tempScorecard.yahtzee_bonus += 1
    } else {
      tempScorecard[selectedCategory] = turnValue
      tempScorecard.scored.push(selectedCategory)
    }
    yahtzeeClient.put(`/scorecards/${scorecardId}`, tempScorecard)
      .then(response => {
        if (response.statusText === "OK") {
          const updatedScorecard = response.data
          console.log("Turn Taken")
          setScorecard(updatedScorecard)
          startNewTurn()
        }
      })
      .catch(error => {
        errorHandler(error)
      })
    }

  return (
    <div className="w-full h-full flex flex-col p-5">
      <div>Turns remaining: {getTurnsRemaining()}</div>
      <div className="flex flex-col py-5">
        <DiceRoller scorecard={scorecard} dice={dice} rollsRemaining={rollsRemaining} setRollsRemaining={setRollsRemaining}/>
        <ScoreButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} rollsRemaining={rollsRemaining} recordScore={recordScore}/>
      </div>
      <div className="py-5">
        Suggestions:
      </div>
    </div>
  )
}

export default DiceBoard
