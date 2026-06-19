import { Page, expect } from '@playwright/test';
import { OpenAccountPage } from '../Page/open-account-page';

export class OpenAccountAction {
  readonly page: Page;
  readonly openAccountPage: OpenAccountPage;

  constructor(page: Page) {
    this.page = page;
    this.openAccountPage = new OpenAccountPage(page);
  }

  async goToOpenNewAccount() {
    await this.openAccountPage.openNewAccountLink.click();
  }

  async selectAccountType(type: 'SAVINGS' | 'CHECKING') {
    await this.openAccountPage.accountTypeDropdown.selectOption(type);
  }

  async selectFromAccount(accountId?: string) {
    if (accountId) {
      await this.openAccountPage.fromAccountDropdown.selectOption(accountId);
    }
  }

  async submitOpenAccount() {
    await this.openAccountPage.openAccountButton.click();
  }

  async createNewSavingsAccount(fromAccountId?: string) {
    await this.goToOpenNewAccount();
    await this.selectAccountType('SAVINGS');
    await this.selectFromAccount(fromAccountId);
    await this.submitOpenAccount();
  }

  async verifyAccountCreationSuccess() {
    await expect(this.openAccountPage.successMessage).toHaveText('Account Opened!');
  }

  async getNewAccountNumber(): Promise<string> {
    return (await this.openAccountPage.newAccountIdLink.textContent())?.trim() ?? '';
  }

  async goToAccountsOverview() {
    await this.openAccountPage.accountsOverviewLink.click();
  }

  async verifyAccountNumberDisplayed(accountNumber: string) {
    const accountLink = this.page.getByRole('link', { name: accountNumber });
    await expect(accountLink).toBeVisible();
  }
}