"use client"

import SignUpForm from "@/components/auth/SignupForm";
import { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  return loading ? (
    loggingIn ? (
      <div>Successfully signed up. Logging in and redirecting to dashboard</div>
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <SignUpForm setLoading={setLoading} setLoggingIn={setLoggingIn} />
  );
}
