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
    await expect(this.openAccountPage.accountTypeDropdown).toBeVisible();

    await this.selectAccountType('SAVINGS');
    await this.selectFromAccount(fromAccountId);

    await this.submitOpenAccount();
  }

  async verifyAccountCreationSuccess() {
    await expect(this.openAccountPage.successMessage)
      .toHaveText('Account Opened!');
  }

  async goToAccountsOverview() {
    await this.openAccountPage.accountsOverviewLink.click();
  }

  async waitForAccountsTable(timeout = 10000) {
    await this.page.waitForSelector('//table[@id="accountTable"]', { timeout });
  }

  async getNewAccountNumber(): Promise<string> {
    await this.goToAccountsOverview();
    await this.waitForAccountsTable();

    return (await this.openAccountPage.firstAccountLink.innerText()).trim();
  }

  async isAccountVisible(accountNumber: string): Promise<boolean> {
    const loc = this.page.getByRole('link', { name: accountNumber });
    const count = await loc.count();
    if (count === 0) return false;

    return await loc.first().isVisible();
  }

  async verifyAccountNumberDisplayed(accountNumber: string) {
    const visible = await this.isAccountVisible(accountNumber);
    expect(visible).toBeTruthy();
  }
}