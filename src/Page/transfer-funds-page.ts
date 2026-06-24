import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;
  readonly transferCompleteMessage: Locator;
  readonly transferAmountDisplay: Locator;
  readonly fromAccountDisplay: Locator;
  readonly toAccountDisplay: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.amountInput = page.locator('//input[@id="amount"]');
    this.fromAccountDropdown = page.locator('//select[@id="fromAccountId"]');
    this.toAccountDropdown = page.locator('//select[@id="toAccountId"]');
    this.transferButton = page.locator('//input[@value="Transfer"]');
    this.transferCompleteMessage = page.locator('//div[@id="showResult"]//h1');
    this.transferAmountDisplay = page.locator('//span[@id="amountResult"]');
    this.fromAccountDisplay = page.locator('//span[@id="fromAccountIdResult"]');
    this.toAccountDisplay = page.locator('//span[@id="toAccountIdResult"]');
    this.errorMessage = page.locator('//p[contains(@class,"error")]');
  }
}