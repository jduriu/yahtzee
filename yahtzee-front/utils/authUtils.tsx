'use client'


export function errorHandler(error) {
  console.log(error)
}

// Token Handlers
export function getJwtToken() {
  return sessionStorage.getItem("jwt")
}

export function setJwtToken(token: string) {
  return sessionStorage.setItem("jwt", token)
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(refreshToken: string) {
  return sessionStorage.setItem("refreshToken", refreshToken)
}

interface FormData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

// Token authentication class for client
export function TokenAuth() {
  const authClient = process.env.ACCOUNTS_API_HOST


  async function signUp(formData: FormData) {
    const url = `${authClient}/api/signup`
    const data = JSON.stringify(formData)

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        // Auto login for token? Or create a separate page?
      }
    } catch (error) {
      return errorHandler(error)
    }

  }

  async function login(username: string, password: string) {
    const form = new FormData()
    form.append("username", username)
    form.append("password", password)
    const url = `${authClient}/api/authenticate`

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: form,
      })
      if (response.ok) {
        const data = await response.json()
        setJwtToken(data.access_token)
        setRefreshToken(data.refresh_token)
        return data.message
      }
    } catch (error) {
      return errorHandler(error)
    }
  }

  return [signUp, login]
}
