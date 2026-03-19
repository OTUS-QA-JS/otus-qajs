import { request } from '@playwright/test'

const TEST_USER = {
  email: 'test@mail.ru',
  password: 'P@ssw0rd',
  username: 'test test'
}

const TEST_ARTICLE = {
  title: 'e2e update kak testirovat',
  description: 'Статья для теста обновления',
  body: '[E2E] Как тестировать',
  tagList: ['e2e']
}

export default async function globalSetup() {
  const baseURL = process.env.E2E_BASE_URL ?? 'https://rwa-188.130.251.61.sslip.io'
  const context = await request.newContext({ baseURL })

  let token: string

  const loginResponse = await context.post('/api/users/login', {
    data: { user: { email: TEST_USER.email, password: TEST_USER.password } }
  })

  if (loginResponse.ok()) {
    const data = await loginResponse.json()
    token = data.user.token
    console.log('✅ Test user exists and can login')
  } else {
    console.log('⚠️ Login failed, creating new test user...')
    const registerResponse = await context.post('/api/users', {
      data: { user: TEST_USER }
    })

    if (registerResponse.ok()) {
      const data = await registerResponse.json()
      token = data.user.token
      console.log('✅ Test user created')
    } else {
      const error = await registerResponse.text()
      console.error('❌ Failed to create test user:', error)
      throw new Error('Failed to create test user')
    }
  }

  const authContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: { Authorization: `Bearer ${token}` }
  })

  const articleResponse = await authContext.post('/api/articles', {
    data: { article: TEST_ARTICLE }
  })

  if (articleResponse.ok()) {
    console.log('✅ Test article created')
  } else if (articleResponse.status() === 422) {
    console.log('✅ Test article already exists')
  } else {
    const error = await articleResponse.text()
    console.log('⚠️ Could not create test article:', error)
  }
}
