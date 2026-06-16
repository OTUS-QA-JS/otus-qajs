import config from '../config/configBookstore'
import { cached } from '../utils/cache'
import { UserCredentials } from '../models'

const generateToken = async ({ userName, password }: UserCredentials) => {
  const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const authorized = async ({ userName, password }: UserCredentials) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const login = async ({ userName, password }: UserCredentials) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const generateTokenCached = cached(generateToken)

const getTokenFromCache = async ({ userName, password }: UserCredentials) => {
  const response = await generateTokenCached({
    userName,
    password
  })
  if (typeof response.data.token !== 'string') {
    throw new Error('No token in response')
  }
  return response.data.token
}

export default {
  generateToken,
  generateTokenCached,
  getTokenFromCache,
  authorized,
  login
}
