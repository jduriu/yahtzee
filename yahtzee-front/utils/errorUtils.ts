import axios, { AxiosError } from "axios"
import { revokeTokens } from "./authUtils"

export function errorHandler(error: Error | AxiosError) {
  if (axios.isAxiosError(error)) {
    // access to config, request, and response
    console.log(error)
    if (error.status === 401) {
      revokeTokens()
      return error
    }
  } else {
    // stock error
    console.log(error)
    return error
  }
}
