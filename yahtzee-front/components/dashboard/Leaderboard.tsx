import { yahtzeeClient, accountsClient } from '@/utils/axiosClients';
import React from 'react';


const Leaderboard = () => {

  const scores = [
    {avatar: "circle", username: "Jon", score: 150, date: "5/15/24"},
  ]




  return (
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <h1 className="text-3xl self-center">Leaderboard</h1>
      <div className="w-full h-full flex flex-col">
        {scores.map((score, index) => (
          <div key={index} className="flex h-[75px] w-full items-center">
            <div className="w-[10%] h-full flex items-center justify-center">{index + 1}</div>
            <div className="flex w-[90%] h-full bg-green-300 border-2 border-green-600 text-black rounded-xl items-center justify-between px-10">
              <div>{score.username}</div>
              <div>{score.score}pts</div>
              <div>{score.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Leaderboard;
