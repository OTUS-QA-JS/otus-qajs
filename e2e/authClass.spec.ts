import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import configRWA from '../framework/config/configRWA'
import {AuthPageClass} from "../framework/pages/AuthPageClass";
import {LoginPageClass} from "../framework/pages/LoginPageClass";

test('Создание нового юзера', async ({ page }) => {
  const authPage = new AuthPageClass(page)

  await authPage.navigate()
  await authPage.auth(faker.person.fullName(), faker.internet.email(), 're@l_passw0rd')

  await expect(page).toHaveURL('/?feed=feed')
})

test('Успешная авторизация', async ({ page }) => {
  const loginPage = new LoginPageClass(page)

  await loginPage.navigate()
  await loginPage.login(configRWA.email, configRWA.password)

  await expect(page).toHaveURL('/?feed=feed')

  await expect(page.getByText('A place to share your')).toBeVisible()
  await expect(page.getByRole('link', { name: 'test test' })).toBeVisible()
})

test('Несуществующий пользователь, не может зайти в систему', async ({ page }) => {
  const loginPage = new LoginPageClass(page)

  await loginPage.navigate()
  await loginPage.login('undefined@mail.ru', 'P@ssw0rd')

  await expect(page).toHaveURL('/login/error?error=CredentialsSignin&provider=credentials')

  await expect(page.getByText('This page could not be found.')).toBeVisible()
})
