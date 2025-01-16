import {Page} from "playwright-core";

export class BasePageClass{
  protected page: Page;

  constructor(page: Page) {
    this.page = page
  }

  async navigeTo(url: string){
    await this.page.goto(url)
  }
}
