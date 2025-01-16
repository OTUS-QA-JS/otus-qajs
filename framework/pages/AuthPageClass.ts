import type { Page } from 'playwright-core'
import {BasePageClass} from "./BasePageClass";

export class AuthPageClass extends BasePageClass{
  private static usernameInput = 'input-username';
  private static emailInput = 'input-email';
  private static passwordInput = 'input-password';
  private static loginButton = 'btn-submit';

  constructor(page: Page) {
    super(page)
  }

  async navigate(){
    await super.navigeTo('/register')
  }

  async auth (username: string, email: string, password: string){
    await this.page.getByTestId(AuthPageClass.usernameInput).fill(username)
    await this.page.getByTestId(AuthPageClass.emailInput).fill(email)
    await this.page.getByTestId(AuthPageClass.passwordInput).fill(password)
    await this.page.getByTestId(AuthPageClass.loginButton).click()
  }
}
