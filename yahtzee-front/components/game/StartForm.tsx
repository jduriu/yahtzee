"use client"

import React, { useState, useEffect } from "react";
import { yahtzeeClient, accountsAuthClient } from "@/utils/axiosClients";
import { useRouter } from "next/navigation";
import { errorHandler } from "@/utils/errorUtils";
import Button from "../global/Button";

interface StartFormProps {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartForm = ({ setMode }: StartFormProps) => {
  const router = useRouter();
  const [user, setUser] = useState({
    user_id: "",
    game_id: "",
  });
  const [players, setPlayers] = useState([""]);

  useEffect(() => {
    accountsAuthClient
      .get("/user")
      .then((response) => {
        const data = response.data;
        setUser(data);
        setPlayers([...players, data.user_id]);
      })
      .catch((error) => {
        router.replace("/login");
      });
  }, [players, router]);

  const createGame = () => {
    const game = {
      start_time: 0.0,
      player_ids: players,
      scorecard_ids: [],
      turns_taken: 0,
    };
    return JSON.stringify(game);
  };

  function selectSinglePlayer() {
    setMode(true);
    const payload = createGame();
    yahtzeeClient
      .post("/game", payload)
      .then((response) => {
        if (response.statusText === "OK") {
          const game = response.data;
          const scorecardParams = {
            user_id: user.user_id,
            game_id: game._id,
          };
          yahtzeeClient.post("/scorecard", scorecardParams).then((response) => {
            if (response.statusText === "OK") {
              router.replace(`/play/${game._id}`);
            }
          });
        }
      })
      .catch((error) => {
        errorHandler(error);
      });
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-3xl font-bold">Play Mode</div>
      <div className="flex gap-3">
        <Button clickHandler={selectSinglePlayer} content="Single Player" />
      </div>
    </div>
  );
};

export default StartForm;
