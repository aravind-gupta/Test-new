import { Page, expect } from '@playwright/test';
import { TransferFundsPage } from '../Page/transfer-funds-page';

export class TransferFundsAction {
  readonly page: Page;
  readonly transferFundsPage: TransferFundsPage;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsPage = new TransferFundsPage(page);
  }

  async goToTransferFunds() {
    await this.transferFundsPage.transferFundsLink.click();
  }

  async fillTransferForm(amount: string, fromAccountId: string, toAccountId: string) {
    await this.transferFundsPage.amountInput.fill(amount);
    await this.transferFundsPage.fromAccountDropdown.selectOption(fromAccountId);
    await this.transferFundsPage.toAccountDropdown.selectOption(toAccountId);
  }

  async submitTransfer() {
    await this.transferFundsPage.transferButton.click();
  }

  async transferFunds(amount: string, fromAccountId: string, toAccountId: string) {
    await this.goToTransferFunds();
    await this.fillTransferForm(amount, fromAccountId, toAccountId);
    await this.submitTransfer();
  }

  async verifyTransferSuccess() {
    await expect(this.transferFundsPage.transferCompleteMessage).toHaveText('Transfer Complete!');
  }

  async verifyTransferDetails(amount: string, fromAccountId: string, toAccountId: string) {
    await expect(this.transferFundsPage.transferAmountDisplay).toContainText(amount);
    await expect(this.transferFundsPage.fromAccountDisplay).toContainText(fromAccountId);
    await expect(this.transferFundsPage.toAccountDisplay).toContainText(toAccountId);
  }

  async verifyErrorMessage(expectedMessage: string) {
    // Get first error message since there can be multiple
    const errorMessages = await this.page.locator('.error').allTextContents();
    let found = false;
    for (const message of errorMessages) {
      if (message.toLowerCase().includes(expectedMessage.toLowerCase())) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(`Expected error message containing "${expectedMessage}" not found. Got: ${errorMessages.join(', ')}`);
    }
  }
}