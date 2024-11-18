import config from '../config/configDummyjson'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest'
import clients from './client'

const client = clients.clientDummyjson

const login = async ({ username, password, expiresInMins }: any) => {
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

const getMe = async ({ token }: any) => {
  const response = await supertest(config.baseURL).get('/user/me').set('Authorization', `Bearer ${token}`)

  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const refresh = async ({ refreshToken, expiresInMins }: any) => {
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
