import type { Page } from 'playwright-core'

export function AuthPage({ page }: { page: Page }) {
  const visit = async () => await page.goto('/register')
  const fillUsername = async (username: string) => await page.getByPlaceholder('Username').fill(username)
  const fillEmail = async (email: string) => await page.getByPlaceholder('Email').fill(email)
  const fillPassword = async (password: string) => await page.getByPlaceholder('Password').fill(password)
  const submit = async () => await page.getByRole('button', { name: 'Sign up' }).click()

  return {
    visit,
    fillUsername,
    fillEmail,
    fillPassword,
    submit
  }
}
