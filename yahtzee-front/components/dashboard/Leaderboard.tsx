import React, { useState, useEffect } from 'react';
import { yahtzeeClient, accountsClient } from '@/utils/axiosClients';
import { errorHandler } from '@/utils/errorUtils';
import { getTime } from '@/utils/processDate';


const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([])

  const getTopScores = () => {
    let tempScores = []
    let tempUsers = {}

    yahtzeeClient
    .get(`/scorecards/completed`)
    .then((response) => {
      if (response.statusText === "OK") {
        const scorecards = response.data.scorecards;
        for (let scorecard of scorecards) {
          tempScores.push({
            user: scorecard.user_id,
            avatar: null,
            username: "",
            score: scorecard.final_score,
            date: getTime(scorecard.completed_date),
          })
          if (!(scorecard.user_id in tempUsers)) {
            tempUsers[scorecard.user_id] = 1
          }
        }
      }
      const payload = {
        users: Object.keys(tempUsers)
      }
      accountsClient
        .post('/leaderboard-users', JSON.stringify(payload))
        .then((response) => {
          if (response.statusText === "OK") {
            tempUsers = response.data.users
            for (let score of tempScores) {
              score.username = tempUsers[score.user]
              delete score.user
            }
            setLeaderboard(tempScores)
          }
        })
    })
    .catch((error) => {
      errorHandler(error);
    });

  }

  useEffect(() => {
    getTopScores();
  }, [])

  return (
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <h1 className="text-3xl self-center">Leaderboard</h1>
      <div className="w-full h-full flex flex-col">
        {leaderboard && leaderboard.map((score, index) => (
          <div key={index} className="flex h-[75px] w-full items-center">
            <div className="w-[10%] h-full flex items-center justify-center">{index + 1}</div>
            <div className="flex w-[90%] h-full bg-green-300 border-2 border-green-600 text-black rounded-xl items-center justify-between px-10">
              <div className="flex w-1/3 justify-start">{score.username}</div>
              <div className="flex w-1/3 justify-center">{score.score}</div>
              <div className="flex w-1/3 justify-end">{score.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Leaderboard;
