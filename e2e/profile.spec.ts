import { test } from '@playwright/test'
import { loginUser } from '../framework'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})
