"use client"

import { useState } from "react";
import { TokenAuth } from "@/utils/authUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/global/Button";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const tokenAuth = TokenAuth();
  const login = tokenAuth.login;
  const router = useRouter();

  const handleSubmit = async () => {
    await login(username, password);
    router.replace("/");
  };

  return (
    <div className="flex flex-col h-full w-full shadow-purple rounded-3xl p-10 items-center justify-center gap-10">
      <div
        id="blue-glow"
        className="text-3xl w-full flex justify-center items-center"
      >
        Welcome Back!
      </div>
      <div className="flex w-full flex-col gap-3 justify-center items-center">
        <div>Username:</div>
        <input
          className="bg-white w-2/3 p-2 text-black"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password:</div>
        <div className="w-2/3 flex justify-center items-center gap-3">
          <input
            className="w-full bg-white p-2 text-black"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id={hidePassword ? "hide-password" : ""}
          />
          {/* Custom button for show/hide need to update to use icons in future, potentially add to global button options? */}
          <button
            onClick={() => setHidePassword(!hidePassword)}
            className="border border-black rounded-full w-[75px]"
          >
            {/* Replace with eye open/close symbols */}
            {hidePassword ? "show" : "hide"}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <Button clickHandler={handleSubmit} content="Submit" style="submit" />
        <div className="text-gray-200">
          <span>If you do not have an account, sign-up by clicking </span>
          <Link href="/signup" className="text-blue-500 hover:underline">
            here
          </Link>
        </div>
      </div>
    </div>
  );
}
