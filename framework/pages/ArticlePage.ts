import type { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export function ArticlePage({ page }: { page: Page }) {
  const visit = async (slug: string | undefined = undefined) => {
    if (slug) {
      await page.goto(`/article/${slug}`)
    }
  }

  const checkContent = async (content: string) => {
    await expect(page.getByText(content)).toBeVisible()
  }

  const clickEdit = async () => {
    await page.getByRole('link', { name: 'Edit Article' }).first().click()
  }

  const clickDelete = async () => {
    await page.getByRole('button', { name: 'Delete Article' }).nth(1).click()
  }

  return {
    visit,
    checkContent,
    clickEdit,
    clickDelete
  }
}
