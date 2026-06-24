import { Page, Locator } from '@playwright/test';

export class ProfileUpdatePage {
  readonly page: Page;
  readonly updateContactInfoLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly updateProfileButton: Locator;
  readonly successMessage: Locator;
  readonly requestLoanLink: Locator;
  readonly loanAmountInput: Locator;
  readonly downPaymentInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly applyNowButton: Locator;
  readonly loanStatusResult: Locator;
  readonly loanErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.updateContactInfoLink = page.getByRole('link', { name: 'Update Contact Info' });
    this.firstName = page.locator('//*[@id="customer.firstName"]');
    this.lastName = page.locator('//*[@id="customer.lastName"]');
    this.address = page.locator('//*[@id="customer.address.street"]');
    this.city = page.locator('//*[@id="customer.address.city"]');
    this.state = page.locator('//*[@id="customer.address.state"]');
    this.zipCode = page.locator('//*[@id="customer.address.zipCode"]');
    this.phone = page.locator('//*[@id="customer.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.successMessage = page.locator('//*[@id="updateProfileResult"]//h1');
    this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
    this.loanAmountInput = page.locator('//*[@id="amount"]');
    this.downPaymentInput = page.locator('//*[@id="downPayment"]');
    this.fromAccountDropdown = page.locator('//*[@id="fromAccountId"]');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanStatusResult = page.locator('//*[@id="loanStatus"]');
    this.loanErrorMessage = page.locator('//*[contains(@class,"error")]');
  }
}