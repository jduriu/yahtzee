'use client'

import SignupForm from "../_components/SignupForm"
import { useState } from 'react'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  return (
    <SignupForm loading={loading} setLoading={setLoading} loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
  )
}
