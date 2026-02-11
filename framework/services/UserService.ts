import axios from 'axios'
import config from '../config/configBookstore'
import TelegramService from './TelegramService'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const getUser = async ({ userId, token }: { userId: string; token: string }) => {
  const response = await client.get(`/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const createUser = async ({ userName, password }: { userName: string; password: string }) => {
  const response = await client.post(`/Account/v1/User`, {
    userName,
    password
  })

  /**
   * ВАЖНО! Это сделано для примера отправки уведомлений в телеграм из тестов..
   * Отправять что-то из тестов куда-то не рекоммендую,
   * кроме тех случаев, когда это мб вам необходимо
   */
  await TelegramService.sendMessage(
    `Создан новый пользователь: \r\n` +
      `username: ${userName} \r\n` +
      `password: ${password} \r\n` +
      `userId: ${response.data.userID}`
  )

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const removeUser = async ({ userId, token }: { userId: number; token: string }) => {
  const response = await client.delete(`/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  get: getUser,
  create: createUser,
  remove: removeUser
}
