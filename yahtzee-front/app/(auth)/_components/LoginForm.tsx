"use client"

import { useState } from "react"
import { TokenAuth, getJwtToken } from "@/utils/authUtils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SubmitButton from "./SubmitButton"


export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hidePassword, setHidePassword] = useState(true)
  const login = TokenAuth()[1]
  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
    router.replace('play')
    // Check if the token is in session storage? If it is, redirect?
    // const token = getJwtToken()
    // if (token) {
    //   const userId = getUserId(token) // create a get function to obtain the user id
    //   router.replace(`/dashboard/${userId}`)
    // }

  }


  return (
    <div className="flex flex-col h-full w-full bg-white/60 shadow-2xl rounded-3xl p-10 items-center gap-10 overflow-y-scroll">
      <div className="text-3xl w-full flex justify-center items-center">Welcome Back!</div>
      <div className="flex w-full flex-col gap-3 justify-center items-center">
        <div>Username:</div>
        <input
          className="bg-white w-2/3 p-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password:</div>
        <div className="w-2/3 flex justify-center items-center gap-3">
          <input
            className="w-full bg-white p-2"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id={hidePassword ? 'hide-password' : ''}
          />
          <button onClick={() => setHidePassword(!hidePassword)} className="border border-black rounded-full w-[75px]">
            {/* Replace with eye open/close symbols */}
            {hidePassword ? 'show' : 'hide'}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <SubmitButton pushHandler={handleSubmit} name='Login'/>
        <div className="text-gray-500">
          <span>If you do not have an account, sign-up by clicking </span>
          <Link href="/signup" className="text-blue-500 hover:underline">here</Link>
        </div>
      </div>
    </div>
  )
}
