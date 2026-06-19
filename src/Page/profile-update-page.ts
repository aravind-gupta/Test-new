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

  // Loan Request
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
    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.address = page.locator('#customer\\.address\\.street');
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zipCode = page.locator('#customer\\.address\\.zipCode');
    this.phone = page.locator('#customer\\.phoneNumber');
    this.updateProfileButton = page.locator('input[value="Update Profile"]');
    this.successMessage = page.locator('#updateProfileResult h1.title');
    this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
    this.loanAmountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.applyNowButton = page.locator('input[value="Apply Now"]');
    this.loanStatusResult = page.locator('#loanStatus');
    this.loanErrorMessage = page.locator('.error');
  }
}