'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { revokeTokens } from "@/utils/authUtils"

export default function Logout() {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleYes = () => {
    setLoggingOut(true)
    revokeTokens()
    setTimeout(() => {
      router.replace('/')
    }, 2000);
  }


  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-3">
      {loggingOut ?
        <div>See you next time!</div>
        :
        <>
          <div>Are you sure you want to log out?</div>
          <div className="flex gap-5">
            <button onClick={handleYes} className="border border-black rounded-full w-[75px]">
              Yes
            </button>
            <button onClick={() => router.back()} className="border border-black rounded-full w-[75px]">
              No
            </button>
          </div>
        </>
      }
    </div>
  )
}
