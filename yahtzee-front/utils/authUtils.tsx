'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction } from 'react'

// Typescript Interfaces
// interface Token {
//   "access_token": string | null,
//   "token_type": string | null
// }

// interface AuthContextType {
//   token: Token | null,
//   setToken: Dispatch<SetStateAction<Token | null>>
// }




// Error handler for incoming non-ES6 errors
// const handleErrorMessage = (error) => {
//   if ("error" in error) {
//     error = error.error;
//     try {
//       error = JSON.parse(error);
//       if ("__all__" in error) {
//         error = error.__all__;
//       }
//     } catch {}
//   }
//   if (Array.isArray(error)) {
//     error = error.join("<br>");
//   } else if (typeof error === "object") {
//     error = Object.entries(error).reduce(
//       (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
//       ""
//     );
//   }
//   return error;
// }

// Context Functions and Wrapper for client Use
// export const AuthContext = createContext<AuthContextType>({
//   token: null,
//   setToken: () => null,
// });

// export const AuthProvider = ({ children } : {children: ReactNode}) => {
//   const [token, setToken] = useState<Token | null>(null)

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// Token Handlers
export function getJwtToken() {
  return sessionStorage.getItem("jwt")
}

export function setJwtToken(token) {
  return sessionStorage.setItem("jwt", token)
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(refreshToken) {
  return sessionStorage.setItem("refreshToken", refreshToken)
}

function handleLogin() {

}


// Token authentication class for client
export function TokenAuth() {
  // Obtaining state from AuthContext
  // let { token, setToken } = useContext(AuthContext)


  // Obtaining token from Users API
  // useEffect(() => {
  //   async function fetchToken() {
  //     const token = await getTokenInternal();
  //     setToken(token)
  //   }
  //   if (!token) {
  //     fetchToken();
  //   }
  // }, [setToken, token]);


  async function login(username: string, password: string) {
    const form = JSON.stringify({"username": username, "password": password})
    const url = "http://localhost:8000/login"

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: form
    })
    if (response.ok) {
      const data = await response.json()
      setToken(data);
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  return [login]
}
