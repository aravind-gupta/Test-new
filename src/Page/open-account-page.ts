import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly openNewAccountLink: Locator;
  readonly accountsOverviewLink: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openAccountButton: Locator;
  readonly openAccountResult: Locator;
  readonly successMessage: Locator;
  readonly newAccountIdLink: Locator;
  readonly accountsTable: Locator;
  readonly firstAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.accountTypeDropdown = page.locator('//select[@id="type"]');
    this.fromAccountDropdown = page.locator('//select[@id="fromAccountId"]');
    this.openAccountButton = page.locator('//input[@value="Open New Account"]');
    this.openAccountResult = page.locator('//div[@id="openAccountResult"]');
    this.successMessage = page.locator('//div[@id="openAccountResult"]//h1');
    this.newAccountIdLink = page.locator('//div[@id="openAccountResult"]//a');
    this.accountsTable = page.locator('//table[@id="accountTable"]');
    this.firstAccountLink = page.locator('//table[@id="accountTable"]//tbody//tr[1]//td//a');
  }
}