import { Page, expect } from '@playwright/test';
import { ProfileUpdatePage } from '../Page/profile-update-page';

export class ProfileUpdateAction {
  readonly page: Page;
  readonly profileUpdatePage: ProfileUpdatePage;

  constructor(page: Page) {
    this.page = page;
    this.profileUpdatePage = new ProfileUpdatePage(page);
  }

  // -------------------------
  // PROFILE UPDATE FLOW
  // -------------------------

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
    await expect(this.profileUpdatePage.successMessage)
      .toHaveText('Profile Updated');
  }

  // -------------------------
  // LOAN FLOW
  // -------------------------

  async goToRequestLoan() {
    await this.profileUpdatePage.requestLoanLink.click();
  }

  async getFirstAvailableAccountId(): Promise<string> {
    const firstOption = this.profileUpdatePage.fromAccountDropdown
      .locator('option')
      .first();

    const value = await firstOption.getAttribute('value');
    return value ?? '';
  }

  async hasFromAccountOption(value: string): Promise<boolean> {
    const count = await this.profileUpdatePage
      .fromAccountDropdown
      .locator(`option[value="${value}"]`)
      .count();

    return count > 0;
  }

  async fillLoanRequestForm(
    loanAmount: string,
    downPayment: string,
    fromAccountId?: string
  ) {
    await this.profileUpdatePage.loanAmountInput.fill(loanAmount);
    await this.profileUpdatePage.downPaymentInput.fill(downPayment);

    if (fromAccountId) {
      const exists = await this.hasFromAccountOption(fromAccountId);

      if (!exists) {
        throw new Error(
          `Account ID "${fromAccountId}" not found in dropdown. ` +
          `Use getFirstAvailableAccountId() instead of hardcoding.`
        );
      }

      await this.profileUpdatePage.fromAccountDropdown.selectOption(fromAccountId);
    }
  }

  async submitLoanRequest() {
    await this.profileUpdatePage.applyNowButton.click();
  }

  async requestLoan(
    loanAmount: string,
    downPayment: string,
    fromAccountId?: string
  ) {
    await this.goToRequestLoan();
    await this.fillLoanRequestForm(loanAmount, downPayment, fromAccountId);
    await this.submitLoanRequest();
  }

  async verifyLoanResponseDisplayed() {
    await expect(this.profileUpdatePage.loanStatusResult).toBeVisible();

    const status = (await this.profileUpdatePage.loanStatusResult.textContent())?.trim();
    expect(['Approved', 'Denied']).toContain(status);
  }

  async verifyLoanErrorMessage(expectedMessage: string) {
    const errors = await this.profileUpdatePage.loanErrorMessage.allTextContents();

    const normalized = expectedMessage.trim().toLowerCase();

    const match = errors.find(e =>
      e.trim().toLowerCase().includes(normalized)
    );

    expect(match).toBeTruthy();
  }
}