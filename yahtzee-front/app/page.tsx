'use client'

import { TokenAuth, getJwtToken, errorHandler } from "@/utils/authUtils"

export default function Home() {

  const gridClasses = "flex flex-col justify-center items-center gap-10 border border-pink-300 border-4 rounded-3xl shadow-2xl"

  const handleHowToPlay = async () => {
    // TEMPORARY USING AS A TEST BUTTON FOR AUTHENTICATOR LOGIC
    const authClient = process.env.ACCOUNTS_API_HOST
    const url = `${authClient}/api/user`
    const token = getJwtToken()

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      errorHandler(error)
    }
  }


  return (
    <div className="w-full h-full flex flex-col p-10">
      <h1 className="text-4xl h-[10%]">Welcome to Yahtzee</h1>
      <div className="h-[90%] grid grid-cols-2 gap-4">
        <div className={gridClasses}>
          <button className="game-button" onClick={handleHowToPlay}>How To Play</button>
          <button className="game-button red">Create Game</button>
          <button className="game-button orange">Open Game</button>
        </div>
        <div className={gridClasses}>
          Leaderboard
        </div>
      </div>
    </div>
  )
}
