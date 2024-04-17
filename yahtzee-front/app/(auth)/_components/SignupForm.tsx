"use client"

import { useState } from "react"
import { TokenAuth } from "@/utils/authUtils"
import Link from "next/link"
import Button from "@/global_components/Button"
import { useRouter } from "next/navigation"


export default function SignUpForm({setLoading, setLoggingIn}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const tokenAuth = TokenAuth()
  const signUp = tokenAuth.signup
  const login = tokenAuth.login
  const router = useRouter()


  const handleSubmit = async () => {
    const formData = {
      username: username,
      password: password,
      email: email,
    }
    setLoading(true)

    await signUp(formData)
    setTimeout(() => {
      setLoggingIn(true)
    }, 2000);
    await login(username, password)
    setTimeout(() => {
      router.replace('/')
    }, 5000)
  }

  const formFields = [
    {name: "Username", value: username, changeHandler: setUsername},
    {name: "Password", value: password, changeHandler: setPassword},
    {name: "Email", value: email, changeHandler: setEmail},
  ]

  return (
    <div className="flex flex-col h-full w-full shadow-purple rounded-3xl p-10 items-center justify-center gap-10">
      <div id="blue-glow" className="text-3xl w-full flex justify-center items-center">Create Account</div>
      <div className="flex w-full flex-col gap-3 justify-center items-center">
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-3 justify-center items-center w-full">
            <div className="">{field.name}:</div>
            <input className="bg-white w-2/3 p-2 text-black" type="text" value={field.value} onChange={(e) => field.changeHandler(e.target.value)}/>
          </div>
        ))}

      </div>
      <div className="w-full justify-center items-center flex flex-col gap-10">
        <Button clickHandler={handleSubmit} content="Submit" style="Submit"/>
        <div className="text-gray-200">
          <span>If you already have an account, click </span>
          <Link href="/login" className="text-blue-500 hover:underline">here</Link>
          <span> to login</span>
        </div>
      </div>
    </div>
  )
}
