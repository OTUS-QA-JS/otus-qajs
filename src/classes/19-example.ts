interface Page {
  goto: (path: string) => void
}

class BasePage {
  page: Page

  constructor({ page }: { page: Page }) {
    this.page = page
  }

  visit(path: string) {
    console.log(`go to login ${path}`)
    this.page.goto(path)
  }
}

// eslint-disable-next-line
class ArticlePage extends BasePage {
  id: string

  constructor({ page, articleId }: { page: Page; articleId: string }) {
    super({ page })
    this.id = articleId
  }

  visit() {
    super.visit(`/article/${this.id}`)
  }
}

// eslint-disable-next-line
class LoginPage extends BasePage {
  visit() {
    super.visit(`/login`)
  }
}
