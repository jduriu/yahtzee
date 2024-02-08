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



// Token authentication class for client
export function TokenAuth() {
  async function login(username: string, password: string) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const url = "http://localhost:8000/authenticate"

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: form,
      })
      if (response.ok) {
        const data = await response.json()
        setJwtToken(data.access_token);
        return data.message;

      }
    } catch (error) {
      return errorHandler(error);
    }
  }

  return [login]
}
