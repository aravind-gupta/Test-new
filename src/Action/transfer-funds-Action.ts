import { Page, expect } from '@playwright/test';
import { TransferFundsPage } from '../Page/transfer-funds-page';

export class TransferFundsAction {
  readonly page: Page;
  readonly transferFundsPage: TransferFundsPage;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsPage = new TransferFundsPage(page);
  }

  async openTransferFunds() {
    await this.transferFundsPage.transferFundsLink.click();
  }

  async fillForm(amount: string, from: string, to: string) {
    await this.transferFundsPage.amountInput.fill(amount);
    await this.transferFundsPage.fromAccountDropdown.selectOption(from);
    await this.transferFundsPage.toAccountDropdown.selectOption(to);
  }

  async submit() {
    await this.transferFundsPage.transferButton.click();
  }

  async transfer(amount: string, from: string, to: string) {
    await this.openTransferFunds();
    await this.fillForm(amount, from, to);
    await this.submit();
  }

  async verifySuccess() {
    await expect(this.transferFundsPage.transferCompleteMessage).toHaveText('Transfer Complete!');
  }

  async verifyDetails(amount: string, from: string, to: string) {
    await expect(this.transferFundsPage.transferAmountDisplay).toContainText(amount);
    await expect(this.transferFundsPage.fromAccountDisplay).toContainText(from);
    await expect(this.transferFundsPage.toAccountDisplay).toContainText(to);
  }

  async verifyError(expected: string) {
    await expect(this.transferFundsPage.errorMessage).toContainText(expected);
  }
}
