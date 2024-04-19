'use client'

import { useState, useEffect, useCallback } from 'react'
import { yahtzeeClient, accountsAuthClient } from '@/utils/axiosClients';
import { useRouter } from 'next/navigation'
import DiceBoard from "./_components/DiceBoard";
import ScoreCard from "./_components/ScoreCard";


export default function Play({params}) {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [scorecard, setScorecard] = useState({})

  const fetchUserAndScorecard = useCallback(() => {
    accountsAuthClient.get('/user')
    .then(response => {
      const user = response.data
      setUser(user)
      const scorecardParams = {
        user_id: user.user_id,
        game_id: params.id,
      };
      yahtzeeClient.get('/scorecard_by_user_and_game', { params: scorecardParams })
        .then(response => {
          setScorecard(response.data);
          console.log("Response for scorecard received")
        })
    })
    .catch(error => {
      console.error("Fetching user failed, redirecting to login", error);
      router.replace('/login');
    })
  }, [params.id, router])

  useEffect(() => {
    if (params.id) {
      fetchUserAndScorecard();
    }
  }, [fetchUserAndScorecard, params.id])

  return (
    <div className="w-full h-full flex gap-3 p-5 border-2 border-black">
      <div className="w-1/2 h-full border-2 border-black">
        <DiceBoard scorecard={scorecard} setScorecard={setScorecard}/>
      </div>
      <div className="w-1/2 h-full border-2 border-black">
        <ScoreCard scorecard={scorecard}/>
      </div>
    </div>
  )
}
