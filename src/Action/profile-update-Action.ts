import { Page, expect } from '@playwright/test';
import { ProfileUpdatePage } from '../Page/profile-update-page';

export class ProfileUpdateAction {  
  readonly page: Page;
  readonly profileUpdatePage: ProfileUpdatePage;

  constructor(page: Page) {
    this.page = page;
    this.profileUpdatePage = new ProfileUpdatePage(page);
  }

  async goToUpdateContactInfo() {
    await this.profileUpdatePage.updateContactInfoLink.click();
  }

  async fillProfileForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }) {
    await this.profileUpdatePage.firstName.fill(data.firstName);
    await this.profileUpdatePage.lastName.fill(data.lastName);
    await this.profileUpdatePage.address.fill(data.address);
    await this.profileUpdatePage.city.fill(data.city);
    await this.profileUpdatePage.state.fill(data.state);
    await this.profileUpdatePage.zipCode.fill(data.zipCode);
    await this.profileUpdatePage.phone.fill(data.phone);
  }

  async submitProfileUpdate() {
    await this.profileUpdatePage.updateProfileButton.click();
  }

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }) {
    await this.goToUpdateContactInfo();
    await this.fillProfileForm(data);
    await this.submitProfileUpdate();
  }

  async verifyProfileUpdateSuccess() {
    await expect(this.profileUpdatePage.successMessage).toHaveText('Profile Updated');
  }

  async goToRequestLoan() {
    await this.profileUpdatePage.requestLoanLink.click();
  }

  async fillLoanRequestForm(loanAmount: string, downPayment: string, fromAccountId: string) {
    await this.profileUpdatePage.loanAmountInput.fill(loanAmount);
    await this.profileUpdatePage.downPaymentInput.fill(downPayment);
    await this.profileUpdatePage.fromAccountDropdown.selectOption(fromAccountId);
  }

  async submitLoanRequest() {
    await this.profileUpdatePage.applyNowButton.click();
  }

  async requestLoan(loanAmount: string, downPayment: string, fromAccountId: string) {
    await this.goToRequestLoan();
    await this.fillLoanRequestForm(loanAmount, downPayment, fromAccountId);
    await this.submitLoanRequest();
  }

  async verifyLoanResponseDisplayed() {
    await expect(this.profileUpdatePage.loanStatusResult).toBeVisible();
    const status = await this.profileUpdatePage.loanStatusResult.textContent();
    expect(['Approved', 'Denied']).toContain(status?.trim());
  }

  async verifyLoanErrorMessage(expectedMessage: string) {
    await expect(this.profileUpdatePage.loanErrorMessage).toContainText(expectedMessage);
  }
}