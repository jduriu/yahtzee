"use client";

import { useState, useEffect, useCallback } from "react";
import { yahtzeeClient, accountsAuthClient } from "@/utils/axiosClients";
import { useRouter } from "next/navigation";
import DiceBoard from "@/components/game/DiceBoard";
import ScoreCard from "@/components/game/ScoreCard";
import GameFeed from "@/components/game/GameFeed";
import { z } from 'zod';
import { User } from '@/schema/UserSchema';
import { Scorecard } from "@/schema/ScorecardSchema";
import { LogHistory } from "@/schema/GameFeedSchema";

type UserSchema = z.infer<typeof User>
type ScorecardSchema = z.infer<typeof Scorecard>
type GameFeedSchema = z.infer<typeof LogHistory>

interface PlayProps {
  params: { id: string };
}

export default function Play({ params }: PlayProps) {
  const router = useRouter();
  const [user, setUser] = useState({} as UserSchema);
  const [scorecard, setScorecard] = useState({} as ScorecardSchema);
  const [gameFeed, setGameFeed] = useState({} as GameFeedSchema);

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
      .get(`/log-history-by-scorecard`, {
        params: { scorecard_id: scorecard._id },
      })
      .then((response) => {
        const logHistory = response.data;
        setGameFeed(logHistory);
      })
      .catch((error) => {
        console.error("Game feed unable to be accessed", error);
      });
  }, [scorecard._id]);

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
    <div className="w-full h-full flex gap-10 px-10 py-2">
      <div className="w-1/2 h-full flex flex-col justify-between gap-5">
        <DiceBoard
          scorecard={scorecard}
          setScorecard={setScorecard}
          gameFeed={gameFeed}
          setGameFeed={setGameFeed}
        />
        <GameFeed user={user} gameFeed={gameFeed}/>
      </div>
      <div className="w-1/2 h-full ">
        <ScoreCard scorecard={scorecard} />
      </div>
    </div>
  );
}
