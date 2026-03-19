import { test, expect } from '@playwright/test'
import { EditorPage, loginUser } from '../framework'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
<<<<<<< HEAD
  await page.getByRole('link', { name: 'New Article' }).click()
  await page.getByPlaceholder('Article Title').fill('article title')
  await page.getByPlaceholder("What's this article about?").fill('about article')
  await page.getByPlaceholder('Write your article (in').fill('article content')
  await page.getByPlaceholder('Enter tags').fill('e2e')
  await page.getByRole('button', { name: 'Publish Article' }).click()
=======
  const editorPage = EditorPage({ page })

  // HeaderElement
  await page.getByRole('link', { name: 'New Post' }).click()

  // EditPage
  await editorPage.fillTitle('article title')
  await editorPage.fillAbout('about article')
  await editorPage.fillContent('article content')
  await editorPage.addTags(['e2e'])
  await editorPage.submit()

  // ArticlePage
>>>>>>> 3258706 (EditPage)
  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
<<<<<<< HEAD
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
=======
  // ArticlePage
  await page.goto('/article/e2e-update-kak-testirovat')
  await page.getByRole('button', { name: 'Edit Article' }).first().click()

  // EditorPage
  await page.waitForURL('/editor/e2e-update-kak-testirovat')
  await page.getByPlaceholder('Write your article (in').fill('[E2E] [Update] Как тестировать EDIT')
  await page.getByRole('button', { name: 'Publish Article' }).click()

  // ArticlePage
  await expect(page.getByText('[E2E] [Update] Как тестировать EDIT')).toBeVisible()
  await page.getByRole('button', { name: 'Edit Article' }).first().click()

  // EditorPage
  await page.waitForURL('/editor/e2e-update-kak-testirovat')
  await page.getByPlaceholder('Write your article (in').fill('[E2E] [Update] Как тестировать UPDATED')
  // для примера отладки, нужно не забывать удалять
  await page.pause()
  await page.getByRole('button', { name: 'Publish Article' }).click()

  // ArticlePage
  await page.waitForURL('/article/e2e-update-kak-testirovat')
  // этого тут тоже не должно быть, но страница в кеше
  await page.reload()

  // ArticlePage
  await expect(page.getByText('[E2E] [Update] Как тестировать UPDATED')).toBeVisible()
})

test('Удаление страницы', async ({ page }) => {
  // EditorPage
  // создаём новую
  await page.getByRole('link', { name: 'New Post' }).click()
>>>>>>> 3258706 (EditPage)
  await page.getByPlaceholder('Article Title').fill('Article for delete')
  await page.getByPlaceholder("What's this article about?").fill('about')
  await page.getByPlaceholder('Write your article (in').fill('Эта статья должна быть удалена! Такая вот судьба')
  await page.getByPlaceholder('Enter tags').fill('E2E')

  const responseCreatePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'POST'
  })
  await page.getByRole('button', { name: 'Publish Article' }).click()

  await responseCreatePromise

  // ArticlePage
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
