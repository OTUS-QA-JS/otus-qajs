import {Page} from "playwright-core";
import {BasePageClass} from "./BasePageClass";

export class EditorPageClass extends BasePageClass{
  private titleInput = 'Article Title'
  private aboutInput = "What's this article about?"
  private contentInput = 'Write your article (in'
  private tagInput = 'Enter tags'
  private publishButton = { name: 'Publish Article' }

  constructor(page: Page) {
    super(page);
  }

  async visit(slug?: string){
    await super.navigeTo(`/editor/${slug}`)
  }

  async isOpen(slug?: string){
    await this.page.waitForURL(`/editor/${slug}`)
  }
}
