import React, { useState } from 'react';
import { yahtzeeClient } from '@/utils/axiosClients';


const GameFeed = ({ scorecard }) => {
  const [gameFeed, setGameFeed] = useState({
    _id: "",
    scorecard_id: "",
    logs: [],
  })

  const fetchGameFeed = () => {
    yahtzeeClient
      .get(`/log-history-by-scorecard`, { params: { scorecard_id: scorecard._id } })
      .then((response) => {
        const logsHistory = response.data
        setGameFeed(logsHistory.logs)
      })
      .catch((error) => {
        console.error("Game feed unable to be accessed", error);
      });
  }

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl pb-4">Game History</h1>
      <div className="flex flex-col gap-2">
        {gameFeed &&
          gameFeed.logs.map((index, log) => (
            <div key={index}>{log}</div>
          ))
        }
      </div>
    </div>
  )
};

export default GameFeed;
