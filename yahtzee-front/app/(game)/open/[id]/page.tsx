'use client'

import React, { useState, useEffect } from 'react';
import { yahtzeeClient } from "@/utils/axiosClients";
import Link from 'next/link';
import Button from '@/components/global/Button';


const SearchPage = ({ params }: { params: { id: number } }) => {
  const[games, setGames] = useState([])

  const getTime = (unixTime: number) => {
    const startTime = new Date(unixTime * 1000)
    const year = startTime.getFullYear()
    const month = startTime.getMonth() + 1
    const day = startTime.getDate()
    let signature = ""
    const getHour = () => {
      const hour = startTime.getHours()
      if (hour > 12) {
        signature = "PM"
        return hour - 12
      }
      signature = "AM"
      return hour
    }
    const min = startTime.getMinutes()
    return `${month}/${day}/${year} ${getHour()}:${min} ${signature}`
  }

  useEffect(() => {
    yahtzeeClient.get('/games-by-user', { params: {id: params.id} })
      .then(response => {
        setGames(response.data.games)
      })

  }, [params.id])

  return (
    <div className="w-full h-full flex flex-col p-5 gap-5">
      <h1 className="text-xl ">
        Game History
      </h1>
      <div className="h-full border-2 border-black rounded-xl">
        <div className="h-full flex flex-col gap-2">
          <div className="h-[40px] w-full flex border-black border-b-2">
            <div className="h-full w-1/3 border-r-2 border-black flex items-center px-4">GameId</div>
            <div className="h-full w-1/3 border-r-2 border-black flex items-center px-4"></div>
            <div className="h-full w-1/3 flex items-center px-4">Date Started</div>
          </div>
          {games.map(game => (
            <div className="h-[30px] w-full flex " key={game._id}>
              <Link href={`/play/${game._id}`} className="h-full w-1/3 border-r border-black flex items-center px-4 hover:underline">
                {game._id}
              </Link>
              <div className="h-full w-1/3 border-r border-black flex items-center px-4 justify-center">
                <Link href={`/play/${game._id}`}>
                  <Button
                    content="play"
                    style="list-play"
                  />
                </Link>
              </div>
              <div className="h-full w-1/3 flex items-center px-4">{getTime(game.start_time)}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SearchPage
