import { yahtzeeClient, accountsClient } from '@/utils/axiosClients';
import { errorHandler } from '@/utils/errorUtils';
import React from 'react';


const Leaderboard = () => {

  const leaderboardScores = [
    {avatar: "circle", username: "Jon", score: 150, date: "5/15/24"},
  ]

  const getTopScores = () => {
    let leaderboardUsers = {}
    const userIDs = [
      '7f7967f311d84dc0a980398adf6b5654',
      '607820b8bb514edfb6ab3cd25a8f1806',
      'd3a54a63bd6f47a4b4ca164e93904921',
    ]

    // Get scorecards ********************
    yahtzeeClient
    .get(`/scorecards/completed`)
    .then((response) => {
      if (response.statusText === "OK") {
        const scorecards = response.data.scorecards; // Update api to send back ordered list?  ********************
        // Create leaderboardScores and a set of users ********************
        for (let scorecard of scorecards) {
          // leaderboardScores.push({
          //   avatar: null,
          //   username: "",
          //   score: scorecard.final_score,
          //   date: scorecard.completed_date,
          // })
          if (!(scorecard.user_id in leaderboardUsers)) {
            leaderboardUsers[scorecard.user_id] = {

            }
          }
        }
      }
      // Send an array of user ids to obtain usernames in an object  ********************
      // const payload = {
      //   // users: Object.keys(leaderboardUsers)
      // }
      // accountsClient
      //   .post('/leaderboard-users', JSON.stringify(payload))
      //   .then((response) => {
      //     if (response.statusText === "OK") {
      //       const users = response.data
      //       console.log(users)
      //       // for (let user of leaderboardUsers) {
      //       //   const username =
      //       //   leaderboardUsers[user.user_id].username =
      //       // }
      //     }
      //   })
    // })
    // .catch((error) => {
    //   errorHandler(error);
    // });

  }


  return (
    <div className="w-full h-full p-10 flex flex-col gap-5">
      <button onClick={getTopScores} className="border px-3 py-2">Click</button>
      <h1 className="text-3xl self-center">Leaderboard</h1>
      <div className="w-full h-full flex flex-col">
        {/* {scores.map((score, index) => (
          <div key={index} className="flex h-[75px] w-full items-center">
            <div className="w-[10%] h-full flex items-center justify-center">{index + 1}</div>
            <div className="flex w-[90%] h-full bg-green-300 border-2 border-green-600 text-black rounded-xl items-center justify-between px-10">
              <div>{score.username}</div>
              <div>{score.score}pts</div>
              <div>{score.date}</div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
};

export default Leaderboard;
