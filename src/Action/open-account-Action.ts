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
      const optionExists = await this.openAccountPage.fromAccountDropdown
        .locator(`option[value="${accountId}"]`)
        .count();
 
      if (optionExists === 0) {
        throw new Error(`Account ID "${accountId}" not found in fromAccountDropdown.`);
      }
 
      await this.openAccountPage.fromAccountDropdown.selectOption(accountId);
    }
  }
 
async createNewSavingsAccount(fromAccountId?: string) {
  await this.goToOpenNewAccount();

  await this.selectAccountType('SAVINGS');

  await this.page.waitForTimeout(1000);

  await this.selectFromAccount(fromAccountId);

  // ❗ missing step
  await this.submitOpenAccount();
}
 
  async submitOpenAccount() {
  await this.openAccountPage.openAccountButton.click();
}
 
  async verifyAccountCreationSuccess() {
    await expect(this.openAccountPage.successMessage).toHaveText('Account Opened!');
  }
 
  async getNewAccountNumber(): Promise<string> {
    const locator = this.openAccountPage.newAccountIdLink;
 
    await expect(locator).toBeVisible({ timeout: 30000 });
 
    return (await locator.innerText()).trim();
  }
 
  async goToAccountsOverview() {
    await this.openAccountPage.accountsOverviewLink.click();
  }
 
  async verifyAccountNumberDisplayed(accountNumber: string) {
    const accountLink = this.page.getByRole('link', { name: accountNumber });
    await expect(accountLink).toBeVisible();
  }
}