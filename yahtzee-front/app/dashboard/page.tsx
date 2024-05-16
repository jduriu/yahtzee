"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { accountsAuthClient } from "@/utils/axiosClients";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    accountsAuthClient
      .get("/user")
      .then(async (response) => {
        const data = response.data;
        router.push(`/dashboard/${data.user_id}`);
      })
      .catch((error) => {
        setLoading(false);
        return;
      });
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col px-5">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="w-full flex items-center">
            <h1 id="blue-glow" className="text-4xl">
              Welcome to Yahtzee
            </h1>
          </div>
          <div className="h-[90%] grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center gap-10 border-pink-300 border-4 rounded-3xl shadow-2xl">
              <Link className="game-button" href="/tutorial">
                How To Play
              </Link>
              <Link className="game-button red" href="/login">
                Login / Sign Up
              </Link>
              <Link className="game-button orange" href="/guest">
                Play as Guest
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-10 border-pink-300 border-4 rounded-3xl shadow-2xl">
              Leaderboard
            </div>
          </div>
        </>
      )}
    </div>
  );
}
