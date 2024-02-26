'use client'

import SignupForm from "../_components/SignupForm"
import { useState } from 'react'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-[90%] w-1/3 rounded-3xl shadow-2xl p-5">
        <SignupForm loading={loading} setLoading={setLoading} loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
      </div>
    </div>
  )
}
