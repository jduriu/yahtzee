"use client"

import { useState } from "react"
import { TokenAuth } from "@/utils/authUtils"


export default function SignupForm({loading, setLoading, loggingIn, setLoggingIn}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const signUp = TokenAuth()[0]
  const login = TokenAuth()[1]


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      username: username,
      password: password,
      email: email,
      full_name: fullName
    }
    const new_user = await signUp(formData)
  }

  return (
    <div className="flex flex-col h-full w-full bg-white/60 shadow-2xl rounded-3xl px-10 py-5 justify-center items-center">
      <div className="text-3xl h-1/4 w-full flex justify-center items-center">Signup Form</div>
      <div className="flex h-1/2 w-full flex-col gap-3 justify-center items-center">
        <div className="">Username:</div>
        <input className="bg-white w-2/3 p-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <div className="">Password:</div>
        <input className="bg-white w-2/3 p-2" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="">Email:</div>
        <input className="bg-white w-2/3 p-2" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div className="">Full Name:</div>
        <input className="bg-white w-2/3 p-2" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
      </div>
      <div className="h-1/4 w-full flex justify-center items-center">
        <button
          className="px-10 py-2 bg-blue-500 border-4 border-white rounded-full hover:bg-gray-300 hover:border-black"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}