'use client'

import { useState, useEffect } from 'react'


import DiceBoard from "./_components/DiceBoard";
import ScoreCard from "./_components/ScoreCard";

export default function Play({params}) {

  // Make API call to obtain current turn and scorecard
  // Send turn data to diceboard and scorecard
  // Initialize a new turn in the diceboard
  const yahtzeeClient = process.env.YAHTZEE_API_HOST

  const turnUrl = `${yahtzeeClient}/turns`
  const scorecardUrl = `${yahtzeeClient}/scorecards`
  console.log(params.id)

  // const getCurrentTurn = async () => {
  //   const turn = await fetch(turnUrl, {
  //     method: "GET",
  //     credentials: "include",
  //   })

  // }

  // useEffect(() => {
  //   turn = getCurrentTurn()
  // }, [])

  return (
    <div className="w-full h-full flex gap-3 p-5 border-2 border-black">
      <div className="w-1/2 h-full border-2 border-black">
        <DiceBoard/>
      </div>
      <div className="w-1/2 h-full border-2 border-black">
        <ScoreCard/>
      </div>
    </div>
  )
}
