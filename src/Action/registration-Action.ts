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
  readonly page: Page;
  readonly registrationPage: RegistrationPage;

  constructor(page: Page) {
    this.page = page;
    this.registrationPage = new RegistrationPage(page);
  }

  async goToRegisterPage() {
    await this.registrationPage.registerLink.click();
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
  }

  async registerNewCustomer(customerData: CustomerData) {
    await this.goToRegisterPage();
    await this.fillRegistrationForm(customerData);
    await this.submitRegistration();
  }

  async verifyRegistrationSuccess() {
    await expect(this.registrationPage.registerSuccessMessage).toBeVisible();
  }

  async getRegistrationSuccessText(): Promise<string> {
    return (await this.registrationPage.registerSuccessMessage.textContent()) ?? '';
  }
}

