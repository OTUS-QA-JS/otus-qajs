import { expect, Page } from '@playwright/test'
import { AuthPage } from '../pages'
import { configRWA } from '../config'

async function login(page: Page, email: string, password: string) {
  const authPage = AuthPage({ page })
  await authPage.visit()

  await authPage.fillEmail(email)
  await authPage.fillPassword(password)
  await authPage.sumbit()

  await expect(page).toHaveURL('/')
}

export async function loginUser(page: Page): Promise<void> {
  await login(page, configRWA.email, configRWA.password)
}

// export async function loginAdmin(page: Page): Promise<void> {
//   await login(page, configRWA.adminEmail, configRWA.adminPassword)
// }
