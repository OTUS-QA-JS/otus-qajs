class SyntaxPage {
  // this
  page: object

  constructor(page: object) {
    this.page = page
  }
}

class OtherPage {
  page: object

  constructor(page: object) {
    this.page = page
  }
}

// eslint-disable-next-line
class TsPage {
  constructor(public page: object) {}
}

const page = {}
// eslint-disable-next-line
const sytaxPage = new SyntaxPage(page)
// eslint-disable-next-line
const otherPage = new OtherPage(page)
