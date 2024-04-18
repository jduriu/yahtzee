import { accountsClient } from '@/utils/axiosClients'
import { errorHandler } from './errorUtils'


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

export function revokeTokens() {
  sessionStorage.removeItem("jwt")
  sessionStorage.removeItem("refreshToken")
  return
}

interface FormData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

// Token authentication class for client
export function TokenAuth() {

  async function signUp(formData: FormData) {
    const data = JSON.stringify(formData)
    await accountsClient.post('/signup', data)
      .then(async response => {
        const data = response.data
        // Auto login for token? Or create a separate page?
      })
      .catch(error => {
        return errorHandler(error)
      })
  }

  async function login(username: string, password: string) {
    const data = {"username": username, "password": password}
    await accountsClient.post('/authenticate', JSON.stringify(data))
      .then(async response => {
        const data = response.data
        setJwtToken(data.access_token)
        setRefreshToken(data.refresh_token)
        return data.message
      })
      .catch(error => {
        return errorHandler(error)
      })
  }

  async function refreshToken() {
      const token = getRefreshToken()
      await accountsClient.post('/authenticate/refresh', null, {
        headers: { 'refresh_token': token }
      })
        .then(async response => {
          const data = response.data
          setJwtToken(data.access_token)
          setRefreshToken(data.refresh_token)
        })
        .catch(error => {
          return errorHandler(error)
        })
  }

  return {
    signup: signUp,
    login: login,
    refreshToken: refreshToken
  }
}
