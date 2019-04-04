import { AUTH_TOKEN } from './constants'

let token: string | undefined = reset()

function reset() {
  return (
    sessionStorage.getItem(AUTH_TOKEN) ||
    localStorage.getItem(AUTH_TOKEN) ||
    undefined
  )
}

export function setToken(
  value: string | null | undefined,
  { local = false, session = false } = {}
) {
  if (!value) {
    localStorage.removeItem(AUTH_TOKEN)
    sessionStorage.removeItem(AUTH_TOKEN)
    return
  }

  if (local) localStorage.setItem(AUTH_TOKEN, value)
  if (session) sessionStorage.setItem(AUTH_TOKEN, value)

  token = value
}

export function getToken() {
  return token
}

export function hasToken() {
  return !!token
}

export const clearToken = () => setToken(undefined)
