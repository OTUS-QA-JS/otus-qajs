import { Page } from 'playwright-core'
import { LoginPage } from '../pages'
import config from '../config/configRWA'

export function login(page: Page) {
  const loginPage = LoginPage({ page })

  return ({ email, password }: { email: string; password: string }) => {
    return loginPage.login({ email, password })
  }
}

export function loginUser(page: Page) {
  return login(page)({ email: config.email, password: config.password })
}
