import { test, expect } from '@playwright/test'
import { loginUser } from '../framework'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
  await page.getByRole('link', { name: 'New Article' }).click()
  await page.getByPlaceholder('Article Title').fill('article title')
  await page.getByPlaceholder("What's this article about?").fill('about article')
  await page.getByPlaceholder('Write your article (in').fill('article content')
  await page.getByPlaceholder('Enter tags').fill('e2e')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  await page.getByRole('link', { name: 'New Article' }).click()
  await page.getByPlaceholder('Article Title').fill('Article for edit')
  await page.getByPlaceholder("What's this article about?").fill('about')
  await page.getByPlaceholder('Write your article (in').fill('Initial content')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByRole('heading')).toContainText('Article for edit')

  await page.getByRole('link', { name: 'Edit Article' }).first().click()
  await expect(page).toHaveURL(/\/editor\//)
  await page.getByPlaceholder('Write your article (in').fill('[E2E] Updated content')
  await page.getByRole('button', { name: 'Publish Article' }).click()
})

test('Удаление страницы', async ({ page }) => {
  await page.getByRole('link', { name: 'New Article' }).click()
  await page.getByPlaceholder('Article Title').fill('Article for delete')
  await page.getByPlaceholder("What's this article about?").fill('about')
  await page.getByPlaceholder('Write your article (in').fill('Эта статья должна быть удалена! Такая вот судьба')
  await page.getByPlaceholder('Enter tags').fill('E2E')
  const responseCreatePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'POST'
  })
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await responseCreatePromise

  // удаляем
  const responsePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'DELETE'
  })

  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    responsePromise,
    page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
    page.waitForURL('/')
  ])
})
