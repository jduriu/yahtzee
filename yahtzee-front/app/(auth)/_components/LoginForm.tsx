"use client"

import { useState } from "react"
import { TokenAuth } from "@/utils/authUtils"
import Link from "next/link"


export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const login = TokenAuth()[1]


  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  const formFields = [
    {name: "Username", value: username, changeHandler: setUsername},
    {name: "Password", value: password, changeHandler: setPassword},
  ]


  return (
    <div className="flex flex-col gap-10 h-full w-full bg-white/60 shadow-2xl rounded-3xl px-10 py-5 justify-center items-center">
      <div className="text-3xl w-full flex justify-center items-center">Login Form</div>
      <div className="flex w-full flex-col gap-3 justify-center items-center">
        {formFields.map((field) => (
          <>
            <div className="">{field.name}:</div>
            <input className="bg-white w-2/3 p-2" type="text" value={field.value} onChange={(e) => field.changeHandler(e.target.value)}/>
          </>
        ))}
      </div>
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <button
          className="px-10 py-2  bg-blue-500 border-4 border-white rounded-full hover:bg-gray-300 hover:border-black"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="text-gray-500">
          <span>If you do not have an account, sign-up by clicking </span>
          <Link href="/signup" className="text-blue-500 hover:underline">here</Link>
        </div>
      </div>
    </div>
  )
}
