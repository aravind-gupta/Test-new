import { Page, Locator } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;

  readonly billPayLink: Locator;
  readonly payeeName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly accountNumber: Locator;
  readonly verifyAccountNumber: Locator;
  readonly amount: Locator;
  readonly fromAccountDropdown: Locator;
  readonly sendPaymentButton: Locator;
  readonly successMessage: Locator;
  readonly payeeNameResult: Locator;
  readonly amountResult: Locator;

  // Find Transactions
  readonly findTransactionsLink: Locator;
  readonly transactionIdInput: Locator;
  readonly findByIdButton: Locator;
  readonly transactionAmountResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.payeeName = page.locator('input[name="payee.name"]');
    this.address = page.locator('input[name="payee.address.street"]');
    this.city = page.locator('input[name="payee.address.city"]');
    this.state = page.locator('input[name="payee.address.state"]');
    this.zipCode = page.locator('input[name="payee.address.zipCode"]');
    this.phone = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumber = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountNumber = page.locator('input[name="verifyAccount"]');
    this.amount = page.locator('input[name="amount"]');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    this.successMessage = page.locator('#billpayResult h1.title');
    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');

    this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
    this.transactionIdInput = page.locator('#transactionId');
    this.findByIdButton = page.locator('#findById button, #transactionId ~ button');
    this.transactionAmountResult = page.locator('#transactionResultsTable, #transactionAmount');
  }
}