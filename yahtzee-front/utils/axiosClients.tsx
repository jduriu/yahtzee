import axios from 'axios'
import { getJwtToken, setJwtToken, TokenAuth } from './authUtils'

const tokenAuth = TokenAuth()
const refreshToken = tokenAuth.refreshToken

const accountsClient = axios.create({
  baseURL: `${process.env.ACCOUNTS_API_HOST}/api`,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
})


// Axios instance with interceptors for refreshing tokens
const accountsAuthClient = axios.create({
  baseURL: `${process.env.ACCOUNTS_API_HOST}/api`,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
})

accountsAuthClient.interceptors.request.use(
  async function (config) {
    const token = getJwtToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

accountsAuthClient.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshToken()

      const token = getJwtToken()
      accountsAuthClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`
      return accountsAuthClient(originalRequest)
    }
    return Promise.reject(error)
  }
)

export { accountsClient, accountsAuthClient }
