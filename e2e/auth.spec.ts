// @ts-check
import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('Создание нового юзера', async ({ page }) => {
  await page.goto('/register')
  await page.getByPlaceholder('Username').fill(faker.person.fullName())
  await page.getByPlaceholder('Email').fill(faker.internet.email())
  await page.getByPlaceholder('Password').fill('re@l_passw0rd')
  await page.getByRole('button', { name: 'Sign up' }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
})

test('Успешная авторизация', async ({ page }) => {
  await page.goto('/login')

  await page.getByPlaceholder('Email').fill('test@mail.ru')
  await page.getByPlaceholder('Password').fill('P@ssw0rd')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'test test' }).first()).toBeVisible()
})
