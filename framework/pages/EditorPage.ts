import { Page } from 'playwright-core'

export function EditorPage({ page }: { page: Page }) {
  const visit = async (slug: string | undefined) => {
    await page.goto(`/editor/${slug}`)
  }

  const fillTitle = async (title: string) => {
    await page.getByPlaceholder('Article Title').fill(title)
  }

  const fillAbout = async (about: string) => {
    await page.getByPlaceholder("What's this article about?").fill(about)
  }

  const fillContent = async (content: string) => {
    await page.getByPlaceholder('Write your article (in').fill(content)
  }

  const addTags = async (tags: string[]) => {
    await page.getByPlaceholder('Enter tags').fill(tags.join(' '))
  }

  const submit = async () => {
    await page.getByRole('button', { name: 'Publish Article' }).click()
  }

  return {
    visit,
    fillTitle,
    fillAbout,
    fillContent,
    addTags,
    submit
  }
}
