'use client'

import { useState, useEffect } from 'react'
import { yahtzeeClient, accountsAuthClient} from "@/utils/axiosClients"
import { useRouter } from 'next/navigation'
import { errorHandler } from '@/utils/errorUtils'

export default function StartForm({setMode}) {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [players, setPlayers] = useState([])

  useEffect(() => {
    accountsAuthClient.get('/user')
      .then(response => {
        const data = response.data
        setUser(data)
        setPlayers([...players, data.user_id])
      })
      .catch(error => {
        router.replace('/login')
      })
  }, [])

  const createGame = () => {
    const game = {
      "start_time": 0.0,
      "player_ids": players,
      "scorecard_ids": [],
      "turns_taken": 0,
    }
    return JSON.stringify(game)
  }

  function selectSinglePlayer() {
    setMode(true)
    const payload = createGame()
    console.log("Trying to create game")
    yahtzeeClient.post('/game', payload)
      .then(response => {
        if (response.statusText === "OK") {
          console.log("Game Created, attempting to make Scorecard")
          const game = response.data
          console.log(game)
          const scorecardParams = {
            user_id: user.user_id,
            game_id: game._id,
          }
          console.log
          yahtzeeClient.post('/scorecard', scorecardParams)
            .then(response => {
              if (response.statusText === "OK") {
                console.log("Scorecard created, redirecting...")
                router.replace(`/play/${game._id}`)
              }
            })
        }
      })
      .catch(error => {
        errorHandler(error)
      });
  }

  return (
    <div className="flex flex-col gap-6 items-center">
        <div className="text-3xl font-bold">Play Mode</div>
        <div className="flex gap-3">
          <button
            className="text-2xl border-2 border-black rounded-lg bg-blue-300 py-2 px-3 hover:text-black"
            onClick={selectSinglePlayer}
          >
            Single Player
          </button>
          {/* <button
            className="flex flex-col items-center
            bg-gray-300 py-2 px-3 text-gray-600
            text-2xl border-2 border-black rounded-lg"
          >
            <div>Multi-Player</div>
            <div className="text-sm">(In development)</div>
          </button> */}
        </div>
    </div>
  )
}
