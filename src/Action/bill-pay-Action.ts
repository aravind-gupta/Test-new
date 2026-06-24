import { Page, expect } from '@playwright/test';
import { BillPayPage } from '../Page/bill-pay-page';

export class BillPayAction {
  readonly page: Page;
  readonly billPayPage: BillPayPage;

  constructor(page: Page) {
    this.page = page;
    this.billPayPage = new BillPayPage(page);
  }

  async goToBillPay() {
    await this.billPayPage.billPayLink.click();
  }

  async fillPayeeDetails(data: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
    amount: string;
  }) {
    await this.billPayPage.payeeName.fill(data.payeeName);
    await this.billPayPage.address.fill(data.address);
    await this.billPayPage.city.fill(data.city);
    await this.billPayPage.state.fill(data.state);
    await this.billPayPage.zipCode.fill(data.zipCode);
    await this.billPayPage.phone.fill(data.phone);

    await this.billPayPage.accountNumber.fill(data.accountNumber);
    await this.billPayPage.verifyAccountNumber.fill(data.accountNumber);

    await this.billPayPage.amount.fill(data.amount);
  }

  async submitPayment() {
    await this.billPayPage.sendPaymentButton.click();
  }

  async payBill(data: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
    amount: string;
  }) {
    await this.goToBillPay();
    await this.fillPayeeDetails(data);
    await this.submitPayment();
  }

  async verifyPaymentSuccess() {
    await expect(this.billPayPage.successMessage)
      .toHaveText('Bill Payment Complete');
  }

  async goToFindTransactions() {
    await this.billPayPage.findTransactionsLink.click();
  }

  async findTransactionByAmount(amount: string) {
    await this.billPayPage.pageAmountInput.fill(amount);
    await this.billPayPage.findByAmountButton.click();
  }

  async verifyTransactionRecordExists(amount: string) {
    const row = this.page.locator(`text=${amount}`);
    await expect(row.first()).toBeVisible();
  }
}