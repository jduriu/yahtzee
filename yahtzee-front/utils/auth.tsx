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
interface Token {
  "access_token": string | null,
  "token_type": string | null
}

interface AuthContextType {
  token: Token | null,
  setToken: Dispatch<SetStateAction<Token | null>>
}


// Error handler for incoming non-ES6 errors
const handleErrorMessage = (error) => {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

// Context Functions and Wrapper for client Use
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children } : {children: ReactNode}) => {
  const [token, setToken] = useState<Token>(null)

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
    )
  }

// GetToken functions
let internalToken: Token | null = null;

export function getToken() {
  return internalToken;
}

export async function getTokenInternal() {
  const url = "http://localhost:8000/authenticate"
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.access_token; // Might have an issue with data shape here...
      return internalToken;
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}


// Token authentication class for client
export const TokenAuth = () => {
  // Obtaining state from AuthContext
  const { token, setToken } = useAuthContext()


  // Obtaining token from Users API
  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token)
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token]);




}
