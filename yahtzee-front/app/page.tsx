import { redirect } from "next/navigation"
import Link from "next/link"

export default function Home() {

  const gridClasses = "flex flex-col justify-center items-center gap-10 border border-pink-300 border-4 rounded-3xl shadow-2xl"

  return (
    <div className="w-full h-full flex flex-col p-10">
      <h1 className="text-4xl text-[#a5f5f5] h-[10%] drop-shadow-glow-blue">Welcome to Yahtzee</h1>
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
