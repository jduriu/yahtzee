import React from 'react';


const GameFeed = ({ scorecard }) => {
  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl">Game History</h1>
      <div className="flex flex-col gap-2">
        <div>... Jon rolled 1, 2, 3, 4, 5</div>
        <div>... Jon scored sixes with a score of 10 </div>
      </div>
    </div>
  )
};

export default GameFeed;
