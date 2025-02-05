import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/login')

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('test@mail.ru')

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('P@ssw0rd')
  await page.getByTestId('btn-submit').click()

  await expect(page).toHaveURL('/?feed=feed')
})

test('Создание страницы', async ({ page }) => {
  await page.getByRole('link', { name: 'New Post' }).click()
  await page.getByPlaceholder('Article Title').fill('article title')
  await page.getByPlaceholder("What's this article about?").fill('about article')
  await page.getByPlaceholder('Write your article (in').fill('article content')
  await page.getByPlaceholder('Enter tags').fill('e2e')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  await page.goto('/article/e2e-update-kak-testirovat')
  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL('/editor/e2e-update-kak-testirovat')
  await page.getByPlaceholder('Write your article (in').fill('[E2E] [Update] Как тестировать EDIT')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByText('[E2E] [Update] Как тестировать EDIT')).toBeVisible()

  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL('/editor/e2e-update-kak-testirovat')
  await page.getByPlaceholder('Write your article (in').fill('[E2E] [Update] Как тестировать UPDATED')
  // для примера отладки, нужно не забывать удалять
  // eslint-disable-next-line playwright/no-page-pause
  await page.pause()
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await page.waitForURL('/article/e2e-update-kak-testirovat')
  // этого тут тоже не должно быть, но страница в кеше
  await page.reload()
  await expect(page.getByText('[E2E] [Update] Как тестировать UPDATED')).toBeVisible()
})

test('Удаление страницы', async ({ page }) => {
  // создаём новую
  await page.getByRole('link', { name: 'New Post' }).click()
  await page.getByPlaceholder('Article Title').fill('Article for delete')
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
    page.waitForURL('/?feed=feed')
  ])
})
