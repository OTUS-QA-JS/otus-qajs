import config from '../../framework/config/configBookstore'
import { AuthService } from '../../framework'
import { addMsg } from 'jest-html-reporters/helper'

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const credentials = {
      userName: config.username,
      password: config.password
    }

    await addMsg({ message: `Пользователь: ${JSON.stringify(credentials, null, 2)}` })

    const response = await AuthService.generateTokenCached(credentials)
    expect(response).toHaveProperty('status', 200)
    expect(response).toHaveProperty('data.result', 'User authorized successfully.')
    expect(response).toHaveProperty('data.token')
  })

  it('Нельзя авторизоваться без пароля', async () => {
    const response = await AuthService.generateToken({
      userName: config.username,
      password: ''
    })
    expect(response.data).toMatchObject({
      code: expect.any(String),
      message: expect.any(String)
    })
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('UserName and Password required.')
  })
})
