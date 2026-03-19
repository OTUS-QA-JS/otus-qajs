import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { LoginPage, AuthPage } from '../framework'

test('Создание нового юзера', async ({ page }) => {
  const authPage = AuthPage({ page })

  await authPage.visit()
  await authPage.fillUsername(faker.person.fullName())
  await authPage.fillEmail(faker.internet.email())
  await authPage.fillPassword('re@l_passw0rd')

  await authPage.submit()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
})

test('Несуществующий пользователь, не может зайти в систему', async ({ page }) => {
  const loginPage = LoginPage({ page })

  await loginPage.visit()

  await loginPage.fillEmail('undefined@mail.ru')
  await loginPage.fillPassword('P@ssw0rd')
  await loginPage.submit()

  await expect(page).toHaveURL('/login')
  await expect(page.locator('app-list-errors')).toBeVisible()
})
