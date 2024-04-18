'use client'

import { useState, useEffect } from 'react'
import { yahtzeeClient, accountsAuthClient } from '@/utils/axiosClients';
import { useRouter } from 'next/navigation'


import DiceBoard from "./_components/DiceBoard";
import ScoreCard from "./_components/ScoreCard";

export default function Play({params}) {


  const router = useRouter()

  const [user, setUser] = useState({})
  const [scorecard, setScorecard] = useState({})

  // Make API call to obtain current scorecard
  // if the scorecard doesn't exist, make a new one
  useEffect(() => {
    const fetchUserAndScorecard = async () => {
      try {
        // Fetch user details
        const userResponse = await accountsAuthClient.get('/user');
        const currentUser = userResponse.data;
        setUser(currentUser);

        // Prepare parameters for the scorecard API call
        const scorecardParams = {
          user_id: currentUser.user_id,
          game_id: params.id,
        };

        // Attempt to fetch the scorecard
        try {
          const scorecardResponse = await yahtzeeClient.get('/scorecard_by_user_and_game', { params: scorecardParams });
          setScorecard(scorecardResponse.data);
          console.log("Response for scorecard received", scorecardResponse.data);
        } catch (error) {
          // If fetching scorecard fails, try creating a new one
          console.error("Fetching scorecard failed, attempting to create a new one", error);
          const newScorecardResponse = await yahtzeeClient.post('/scorecard', scorecardParams);
          setScorecard(newScorecardResponse.data);
        }
      } catch (error) {
        // If fetching user fails, redirect to login
        console.error("Fetching user failed, redirecting to login", error);
        router.replace('/login');
      }
    };

    if (params.id) {
      fetchUserAndScorecard();
    }
  }, [router, params.id])

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
