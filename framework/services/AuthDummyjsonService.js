import config from '../config/configDummyjson'
import supertest from 'supertest'
import clients from './client'

const client = clients.clientDummyjson

const login = async ({ username, password, expiresInMins }) => {
  const response = await fetch(`${config.baseURL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins
    })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const getMe = async ({ token }) => {
  const response = await supertest(config.baseURL).get('/user/me').set('Authorization', `Bearer ${token}`)

  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const refresh = async ({ refreshToken, expiresInMins }) => {
  const response = await client.post('/auth/refresh', {
    refreshToken,
    expiresInMins
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  login,
  me: getMe,
  refresh
}
