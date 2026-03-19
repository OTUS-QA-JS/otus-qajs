import { test, expect } from '@playwright/test'
import { loginUser, EditorPage, ArticlePage } from '../framework'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })

  await editorPage.visit()
  await editorPage.fillTitle('article title')
  await editorPage.fillAbout('about article')
  await editorPage.fillContent('article content')
  await editorPage.addTags(['e2e'])
  await editorPage.submit()

  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })
  const articlePage = ArticlePage({ page })

  await editorPage.visit()
  await editorPage.fillTitle('e2e update kak testirovat')
  await editorPage.fillAbout('Статья для теста обновления')
  await editorPage.fillContent('[E2E] Как тестировать')
  await editorPage.addTags(['e2e'])

  const responsePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'POST'
  })
  await editorPage.submit()
  await responsePromise

  await page.waitForURL(/\/article\//, { timeout: 10000 })
  await page.waitForLoadState('networkidle')

  const titleElement = page.locator('h1').first()
  await expect(titleElement).toBeVisible({ timeout: 10000 })

  await expect(titleElement).toContainText('e2e update kak testirovat')
  await articlePage.clickEdit()

  await page.waitForURL(/\/editor\//, { timeout: 10000 })
  await editorPage.fillTitle('e2e update kak testirovat')
  await editorPage.fillAbout('Статья для теста обновления')
  await editorPage.fillContent('[E2E] [Update] Как testировать EDIT')
  await editorPage.addTags(['e2e'])

  const updateResponsePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'PUT'
  })
  await editorPage.submit()
  await updateResponsePromise

  await page.waitForURL(/\/article\//, { timeout: 10000 })
  await page.waitForLoadState('networkidle')

  const updatedTitleElement = page.locator('h1').first()
  await expect(updatedTitleElement).toContainText('e2e update kak testirovat')
  await articlePage.checkContent('[E2E] [Update] Как testировать EDIT')
})

test('Удаление страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })
  const articlePage = ArticlePage({ page })

  await editorPage.visit()
  await editorPage.fillTitle('Article for delete')
  await editorPage.fillAbout('about')
  await editorPage.fillContent('Эта статья должна быть удалена! Такая вот судьба')
  await editorPage.addTags(['E2E'])
  const responseCreatePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'POST'
  })
  await editorPage.submit()
  await responseCreatePromise

  await articlePage.clickDelete()

  const responsePromise = page.waitForResponse(request => {
    return request.url().includes('/api/articles') && request.request().method() === 'DELETE'
  })

  page.once('dialog', dialog => dialog.accept())
  await Promise.all([responsePromise, articlePage.clickDelete(), page.waitForURL('/')])
})
