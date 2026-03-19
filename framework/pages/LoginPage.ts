import type { Page } from 'playwright-core'

export function LoginPage({ page }: { page: Page }) {
  const visit = async () => await page.goto('/login')
  const fillEmail = async (email: string) => await page.getByPlaceholder('Email').fill(email)
  const fillPassword = async (password: string) => await page.getByPlaceholder('Password').fill(password)
  const submit = async () => await page.getByRole('button', { name: 'Sign in' }).click()

  return {
    visit,
    fillEmail,
    fillPassword,
    submit
  }
}
