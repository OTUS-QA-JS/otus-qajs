import { config as _config, AuthDummyjsonService } from '../../framework'

const config = _config.dummyjson

describe('Auth', () => {
  // beforeEach

  it('Success login', async () => {
    const response = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password,
      expiresInMins: 30
    })

    expect(response.status).toEqual(200)
    expect(response.data.username).toBe(config.username)
    expect(response.data.accessToken).toBeTruthy()
  })

  it('Failed login', async () => {
    const response = await AuthDummyjsonService.login({
      username: config.username,
      password: 'wrong_password',
      expiresInMins: 30
    })

    expect(response.status).toEqual(400)
    expect(response.data.message).toBe('Invalid credentials')
  })

  it('me information', async () => {
    const responseToken = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password
    })

    const responseMe = await AuthDummyjsonService.me({
      token: responseToken.data.accessToken
    })

    expect(responseToken.status).toEqual(200)
    expect(responseMe.status).toBe(200)
    expect(responseMe.data.email).toEqual('emily.johnson@x.dummyjson.com')
  })

  const tokens = [
    {
      name: 'empty token',
      token: ''
    },
    {
      name: 'expired token',
      token: '' // FIXME: add token
    }
  ]
  it.each(tokens)('me information forbidden $name', async ({ token }) => {
    const responseMe = await AuthDummyjsonService.me({
      token
    })

    expect(responseMe.status).toBe(401)
    expect(responseMe.data).toEqual({
      message: 'Invalid/Expired Token!'
    })
  })

  it('me information throw 500 if invalid signature', async () => {
    const response = await AuthDummyjsonService.me({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    expect(response.status).toBe(500)
    expect(response.data).toEqual({
      message: 'invalid signature'
    })
  })

  it('Success refresh token', async () => {
    const responseToken = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password
    })

    const responseRefresh = await AuthDummyjsonService.refresh({
      refreshToken: responseToken.data.refreshToken
    })

    expect(responseToken.status).toBe(200)
    expect(responseRefresh.status).toBe(200)
    expect(responseRefresh.data.accessToken).toBeDefined()
    expect(responseRefresh.data.refreshToken).toBeDefined()
  })

  it('Can refresh token by access token', async () => {
    const responseToken = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password
    })

    const responseRefresh = await AuthDummyjsonService.refresh({
      refreshToken: responseToken.data.accessToken
    })

    expect(responseToken.status).toBe(200)
    expect(responseRefresh.status).toBe(200)
    expect(responseRefresh.data.accessToken).toBeDefined()
    expect(responseRefresh.data.refreshToken).toBeDefined()
  })

  it('Cant refresh token by token with invalid signature', async () => {
    const responseToken = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password
    })

    const responseRefresh = await AuthDummyjsonService.refresh({
      refreshToken: responseToken.data.refreshToken + '1'
    })

    expect(responseToken.status).toBe(200)
    expect(responseRefresh.status).toBe(403)
    expect(responseRefresh.data).toEqual({
      message: 'Invalid refresh token'
    })
  })
})
