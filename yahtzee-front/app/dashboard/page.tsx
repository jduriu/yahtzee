'use client'

import Link from "next/link"
import { useEffect } from 'react'
import { accountsAuthClient } from "@/utils/axiosClients"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    accountsAuthClient.get('/user')
      .then(async response => {
        const data = response.data
        router.push(`/${data.user_id}`)
      })
      .catch(error => {
        return
      })
  }, [])

  const gridClasses = "flex flex-col justify-center items-center gap-10 border border-pink-300 border-4 rounded-3xl shadow-2xl"

  return (
    <div className="w-full h-full flex flex-col px-5">
      <div className="w-full flex items-center ">
        <h1 id="blue-glow" className="text-4xl ">
          Welcome to Yahtzee
        </h1>
      </div>
      <div className="h-[90%] grid grid-cols-2 gap-4">
        <div className={gridClasses}>
          <Link className="game-button" href='/tutorial'>How To Play</Link>
          <Link className="game-button red" href='/login'>Login / Sign Up</Link>
          <Link className="game-button orange" href='/guest'>Play as Guest</Link>
        </div>
        <div className={gridClasses}>
          Leaderboard
        </div>
      </div>
    </div>
  )
}
