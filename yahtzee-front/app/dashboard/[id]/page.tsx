'use client'

import Link from "next/link"
import { useEffect, useState } from 'react'
import { accountsAuthClient } from "@/utils/axiosClients"
import { useRouter } from "next/navigation"


export default function Dashboard ({ params }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  useEffect(() => {
    accountsAuthClient.get('/user')
      .then(async response => {
        const data = response.data
        setUser(data)
      })
      .catch(error => {
        router.replace('/login')
      })
  }, [])

  const gridClasses = "flex flex-col justify-center items-center gap-10 border border-pink-300 border-4 rounded-3xl shadow-2xl"
  return (
    <div className="w-full h-full flex flex-col gap-3 px-5">
      <div className="w-full flex items-center">
        <h1 className="text-4xl text-[#a5f5f5] drop-shadow-glow-blue">
          {user && `Welcome back ${user.username}!`}
        </h1>
      </div>
      <div className="h-[90%] grid grid-cols-2 gap-4">
        <div className={gridClasses}>
          <Link className="game-button" href='/tutorial'>How To Play</Link>
          <Link className="game-button red" href='/create'>Create Game</Link>
          <Link className="game-button orange" href={`/find/${user && user.user_id}`}>Open Game</Link>
        </div>
        <div className={gridClasses}>
          Leaderboard
        </div>
      </div>
    </div>
  )
}
