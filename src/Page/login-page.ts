import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly loginUsername: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly accountServicesHeading: Locator;
  readonly welcomeMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginUsername = page.locator('//input[@name="username"]');
    this.loginPassword = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//input[@value="Log In"]');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    this.accountServicesHeading = page.getByRole('heading', { name: 'Account Services' });
    this.welcomeMessage = page.locator('//div[@id="leftPanel"]//p');
    this.errorMessage = page.locator('//p[contains(@class,"error")]');
  }
}