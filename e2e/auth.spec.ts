import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { AuthPage, SignUpPage } from '../framework'
import { configRWA } from '../framework/config'

test('Создание нового юзера', async ({ page }) => {
  const signUpPage = SignUpPage({ page })

  const userName = faker.person.fullName()

  await signUpPage.visit()
  await signUpPage.fillUserName(userName)
  await signUpPage.fillEmail(faker.internet.email())
  await signUpPage.fillPassword('re@l_passw0rd')
  await signUpPage.submit()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
  await expect(page.getByRole('link', { name: userName }).first()).toBeVisible()
})

test('Успешная авторизация', async ({ page }) => {
  const authPage = AuthPage({ page })
  await authPage.visit()

  await authPage.fillEmail(configRWA.email)
  await authPage.fillPassword(configRWA.password)
  await authPage.sumbit()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'test test' }).first()).toBeVisible()
})

test('Ошибка авторизация', async ({ page }) => {
  const authPage = AuthPage({ page })
  await authPage.visit()

  await authPage.fillEmail('test11@mail.ru')
  await authPage.fillPassword('P@ssw0rd')
  await authPage.sumbit()

  await expect(page.getByText('credentials invalid')).toBeVisible()
})
