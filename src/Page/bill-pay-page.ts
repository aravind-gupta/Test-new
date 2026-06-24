import { Page, Locator } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
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
  readonly transactionIdInput: Locator;
  readonly findByIdButton: Locator;
  readonly transactionAmountResult: Locator;
  readonly pageAmountInput: Locator;
  readonly findByAmountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
    this.payeeName = page.locator('//input[@name="payee.name"]');
    this.address = page.locator('//input[@name="payee.address.street"]');
    this.city = page.locator('//input[@name="payee.address.city"]');
    this.state = page.locator('//input[@name="payee.address.state"]');
    this.zipCode = page.locator('//input[@name="payee.address.zipCode"]');
    this.phone = page.locator('//input[@name="payee.phoneNumber"]');
    this.accountNumber = page.locator('//input[@name="payee.accountNumber"]');
    this.verifyAccountNumber = page.locator('//input[@name="verifyAccount"]');
    this.amount = page.locator('//input[@name="amount"]');
    this.fromAccountDropdown = page.locator('//select[@id="fromAccountId"]');
    this.sendPaymentButton = page.locator('//input[@value="Send Payment"]');
    this.successMessage = page.locator('//div[@id="billpayResult"]//h1');
    this.payeeNameResult = page.locator('//span[@id="payeeName"]');
    this.amountResult = page.locator('//span[@id="amount"]');
    this.transactionIdInput = page.locator('//input[@id="transactionId"]');
    this.findByIdButton = page.locator('//button[contains(text(),"Find Transactions")]');
    this.transactionAmountResult = page.locator('//table[@id="transactionResultsTable"]');
    this.pageAmountInput = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
  }
}