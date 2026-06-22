// import { Page, expect } from '@playwright/test';
// import { RegistrationPage } from '../Page/registration-page';

// export interface CustomerData {
//   firstName: string;
//   lastName: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   phone: string;
//   ssn: string;
//   username: string;
//   password: string;
// }

// export class RegistrationAction {
//   constructor(
//     private readonly page: Page,
//     private readonly registrationPage = new RegistrationPage(page)){}

//   async goToRegisterPage() {
//     await this.registrationPage.registerLink.click();
//   }

//   async fillRegistrationForm(data: CustomerData) {
//     await this.registrationPage.firstName.fill(data.firstName);
//     await this.registrationPage.lastName.fill(data.lastName);
//     await this.registrationPage.address.fill(data.address);
//     await this.registrationPage.city.fill(data.city);
//     await this.registrationPage.state.fill(data.state);
//     await this.registrationPage.zipCode.fill(data.zipCode);
//     await this.registrationPage.phone.fill(data.phone);
//     await this.registrationPage.ssn.fill(data.ssn);
//     await this.registrationPage.username.fill(data.username);
//     await this.registrationPage.password.fill(data.password);
//     await this.registrationPage.confirmPassword.fill(data.password);
//   }

//   async submitRegistration() {
//     await this.registrationPage.registerButton.click();
//   }

//   async registerNewCustomer(customerData: CustomerData) {
//     if (!this.page.url().includes('register.htm')) {
//       await this.goToRegisterPage();
//     }

//     await this.fillRegistrationForm(customerData);
//     await this.submitRegistration();
//   }

//   async verifyRegistrationSuccess() {
//     await expect(
//       this.registrationPage.registerSuccessMessage
//     ).toContainText('Your account was created successfully');
//   }

//   async getRegistrationSuccessText(): Promise<string> {
//     return (
//       (await this.registrationPage.registerSuccessMessage.textContent()) ?? ''
//     );
//   }
// }

import { Page, expect } from '@playwright/test';
import { RegistrationPage } from '../Page/registration-page';

export interface CustomerData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

export class RegistrationAction {
  constructor(
    private readonly page: Page,
    private readonly registrationPage = new RegistrationPage(page)) {}

  async goToRegisterPage() {
    await this.registrationPage.registerLink.click();
    await this.failIfCloudflareChallenge();
  }

  async fillRegistrationForm(data: CustomerData) {
    await this.registrationPage.firstName.fill(data.firstName);
    await this.registrationPage.lastName.fill(data.lastName);
    await this.registrationPage.address.fill(data.address);
    await this.registrationPage.city.fill(data.city);
    await this.registrationPage.state.fill(data.state);
    await this.registrationPage.zipCode.fill(data.zipCode);
    await this.registrationPage.phone.fill(data.phone);
    await this.registrationPage.ssn.fill(data.ssn);
    await this.registrationPage.username.fill(data.username);
    await this.registrationPage.password.fill(data.password);
    await this.registrationPage.confirmPassword.fill(data.password);
  }

  async submitRegistration() {
    await this.registrationPage.registerButton.click();
    await this.failIfCloudflareChallenge();
  }

  async registerNewCustomer(customerData: CustomerData) {
    if (!this.page.url().includes('register.htm')) {
      await this.goToRegisterPage();
    }

    await this.fillRegistrationForm(customerData);
    await this.submitRegistration();
  }

  async verifyRegistrationSuccess() {
    await this.failIfCloudflareChallenge();

    await expect(
      this.registrationPage.registerSuccessMessage
    ).toContainText('Your account was created successfully');
  }

  async getRegistrationSuccessText(): Promise<string> {
    return (
      (await this.registrationPage.registerSuccessMessage.textContent()) ?? ''
    );
  }

  /**
   * Detects Cloudflare's bot-verification interstitial and fails fast
   * with a clear message, instead of letting the test time out on an
   * assertion that was never going to pass.
   */
  private async failIfCloudflareChallenge() {
    const challengeVisible = await this.registrationPage.cloudflareChallenge
      .isVisible()
      .catch(() => false);

    if (challengeVisible) {
      throw new Error(
        'Blocked by Cloudflare bot-verification challenge (not an app defect). ' +
        'Reduce request frequency/parallelism against parabank.parasoft.com or retry.'
      );
    }
  }
}

