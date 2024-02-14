'use client'

import { useState } from 'react'

export default function StartForm() {

  const [loading, setLoading] = useState(false)
  const gameUrl = "http://localhost:8000/game"

  const createNewGame = async () => {
    setLoading(true)
    // const response = await fetch(gameUrl,
    //   {
    //     method: "POST",
    //     credentials: "include",
    //     body: {}
    //   }
    // )
    // Create Game Logic Here
    // Use Auth info for player information
    // Send POST request to create game
    // Redirect to Play page
    setLoading(false)
    return
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      {loading ?
        <div>Loading</div>
      :
      <>
        <div className="text-3xl font-bold">Play Mode</div>
        <div className="flex gap-3">
          <button
            className="text-2xl border-2 border-black rounded-lg bg-blue-300 py-2 px-3 hover:text-black"
            onClick={createNewGame}
          >
            Single Player
          </button>
          <button
            className="flex flex-col items-center
            bg-gray-300 py-2 px-3 text-gray-600
            text-2xl border-2 border-black rounded-lg"
          >
            <div>Multi-Player</div>
            <div className="text-sm">(In development)</div>
          </button>
        </div>
      </>
      }
    </div>
  )
}
