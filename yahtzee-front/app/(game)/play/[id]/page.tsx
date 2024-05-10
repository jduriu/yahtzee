"use client"

import { useState, useEffect, useCallback } from "react";
import { yahtzeeClient, accountsAuthClient } from "@/utils/axiosClients";
import { useRouter } from "next/navigation";
import DiceBoard from "@/components/game/DiceBoard";
import ScoreCard from "@/components/game/ScoreCard";
import GameFeed from "@/components/game/GameFeed";

interface PlayProps {
  params: { id: string }
}

export default function Play({ params }: PlayProps) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [scorecard, setScorecard] = useState({
    _id: "",
    user_id: "string",
    player_order_id: 0,
    game_id: "string",
    scored: [""],
    bonus: 0,
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    three_of_kind: 0,
    four_of_kind: 0,
    full_house: 0,
    sm_straight: 0,
    lg_straight: 0,
    yahtzee: 0,
    chance: 0,
    yahtzee_bonus: 0,
  });
  const [gameFeed, setGameFeed] = useState({})

  const fetchUserAndScorecard = useCallback(() => {
    accountsAuthClient
      .get("/user")
      .then((response) => {
        const user = response.data;
        setUser(user);
        const scorecardParams = {
          user_id: user.user_id,
          game_id: params.id,
        };
        yahtzeeClient
          .get("/scorecard_by_user_and_game", { params: scorecardParams })
          .then((response) => {
            setScorecard(response.data);
            console.log("Response for scorecard received");
          });
      })
      .catch((error) => {
        console.error("Fetching user failed, redirecting to login", error);
        router.replace("/login");
      });
  }, [params.id, router]);

  const fetchGameFeed = useCallback(() => {
    yahtzeeClient
    .get(`/log-history-by-scorecard`, { params: { scorecard_id: scorecard._id } })
      .then((response) => {
        const logsHistory = response.data
        setGameFeed(logsHistory.logs)
      })
      .catch((error) => {
        console.error("Game feed unable to be accessed", error);
      });
  }, [scorecard._id])

  useEffect(() => {
    if (params.id) {
      fetchUserAndScorecard();
    }
  }, [fetchUserAndScorecard, params.id]);

  useEffect(() => {
    if (scorecard._id) {
      fetchGameFeed();
    }
  }, [fetchGameFeed, scorecard]);


  return (
    <div className="w-full h-full flex gap-3 p-10 ">
      <div className="w-1/2 h-full flex flex-col">
        <DiceBoard scorecard={scorecard} setScorecard={setScorecard} setGameFeed={setGameFeed}/>
        <GameFeed scorecard={scorecard}/>
      </div>
      <div className="w-1/2 h-full ">
        <ScoreCard scorecard={scorecard} />
      </div>
    </div>
  );
}
