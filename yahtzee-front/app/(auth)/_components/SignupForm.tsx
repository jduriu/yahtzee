"use client"

import { useState } from "react"
import { TokenAuth } from "@/utils/authUtils"
import Link from "next/link"


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

  const formFields = [
    {name: "Username", value: username, changeHandler: setUsername},
    {name: "Password", value: password, changeHandler: setPassword},
    {name: "Email", value: email, changeHandler: setEmail},
    {name: "Full Name", value: fullName, changeHandler: setFullName},
  ]

  return (
    <div className="flex flex-col h-full w-full bg-white/60 shadow-2xl rounded-3xl px-10 py-5 justify-center items-center gap-10">
      <div className="text-3xl w-full flex justify-center items-center">Signup Form</div>
      <div className="flex w-full flex-col gap-3 justify-center items-center">
        {formFields.map((field) => (
          <>
            <div className="">{field.name}:</div>
            <input className="bg-white w-2/3 p-2" type="text" value={field.value} onChange={(e) => field.changeHandler(e.target.value)}/>
          </>
        ))}

      </div>
      <div className="w-full justify-center items-center flex flex-col gap-10">
        <button
          className="px-10 py-2 bg-blue-500 border-4 border-white rounded-full hover:bg-gray-300 hover:border-black"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="text-gray-500">
          <span>If you already have an account, click </span>
          <Link href="/login" className="text-blue-500 hover:underline">here</Link>
          <span> to login</span>
        </div>
      </div>
    </div>
  )
}
