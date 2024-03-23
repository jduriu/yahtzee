'use client'

import { useState, useEffect } from 'react'

import DiceBoard from "./_components/DiceBoard";
import ScoreCard from "./_components/ScoreCard";
import { yahtzeeClient, accountsAuthClient } from '@/utils/axiosClients';

export default function Play({params}) {
  const game_id = params.id
  const [game, setGame] = useState({})
  const [scorecard, setScorecard] = useState({})
  const [user, setUser] = useState({})

  const getUser = async () => {
    accountsAuthClient.get('/user')
    .then(async response => {
      const data = response.data
      setUser(data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const createScorecard = () => {
    const new_card = {
      user_id: user.user_id,
      game_id: game_id,
    }
    return JSON.stringify(new_card)
  }

  const getScorecard = async () => {
    yahtzeeClient.get('/scorecard_by_user', {
      params: {
        user_id: user.user_id,
        game_id: game_id
      }
    })
    .then(async response => {
      const data = response.data
      setScorecard(data)
    })
    .catch(error => {
      const newScorecard = createScorecard()
      yahtzeeClient.post('/scorecard', newScorecard)
      .then(async response => {
        const data = response.data
        setScorecard(data)
      })
      .catch(error => {
        return
      })
    })
  }

  const getGame = async () => {
    yahtzeeClient.get('/game', {
      params: {
        game_id: game_id
      }
    })
    .then(async response => {
      const data = response.data
      setGame(data)
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getGame()
    getScorecard()
  }, [user])

  return (
    <div className="w-full h-full flex gap-3 p-5 border-2 border-black">
      <div className="w-1/2 h-full border-2 border-black">
        <DiceBoard/>
      </div>
      <div className="w-1/2 h-full border-2 border-black">
        {scorecard ?
          <ScoreCard scorecard={scorecard}/>
          :
          <div>Loading...</div>
        }
      </div>
    </div>
  )
}
