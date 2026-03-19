import { Page } from '@playwright/test'

export function SignUpPage({ page }: { page: Page }) {
  const visit = async () => {
    await page.goto('/register')
  }

  const fillUserName = async (userName: string) => {
    await page.getByPlaceholder('Username').fill(userName)
  }

  const fillEmail = async (email: string) => {
    await page.getByPlaceholder('Email').fill(email)
  }

  const fillPassword = async (password: string) => {
    await page.getByPlaceholder('Password').fill(password)
  }

  const submit = async () => {
    await page.getByRole('button', { name: 'Sign up' }).click()
  }

  return {
    visit,
    fillUserName,
    fillEmail,
    fillPassword,
    submit
  }
}
