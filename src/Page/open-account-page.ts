import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;

  readonly openNewAccountLink: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openAccountButton: Locator;
  readonly successMessage: Locator;
  readonly newAccountIdLink: Locator;

  // Accounts Overview
  readonly accountsOverviewLink: Locator;
  readonly accountsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openAccountButton = page.locator('input[value="Open New Account"]');
    this.successMessage = page.locator('#openAccountResult h1.title');
    this.newAccountIdLink = page.locator('#newAccountId');

    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.accountsTable = page.locator('#accountTable');
  }
}