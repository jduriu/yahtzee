'use client'

import { useState } from 'react'


export default function StartForm() {

  const [numPlayers, setNumPlayers] = useState(0)

  const number_of_players = [1, 2, 3, 4, 5, 6, 7 ,8, 9, 19]

  return (
    <form className="flex flex-col gap-3">
      <div className="flex gap-5 text-xl">
        <label>How Many Players?</label>
        <select
        className="rounded-lg px-1"
        onChange={(e) => setNumPlayers(e.target.value)}
        >
          {number_of_players.map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
      </div>
    </form>
  )
}
