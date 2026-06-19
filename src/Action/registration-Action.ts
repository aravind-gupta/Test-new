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
       const requiredFields: (keyof CustomerData)[] = [
      'firstName', 'lastName', 'address', 'city', 'state',
      'zipCode', 'phone', 'ssn', 'username', 'password',
    ];

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        throw new Error(`Registration data missing required field: "${field}". Received: ${JSON.stringify(data)}`);
      }
    }

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

  async getRegistrationSuccessText(): Promise<string> {
    return (await this.registrationPage.registerSuccessMessage.textContent()) ?? '';
  }

  async verifyRegistrationSuccess() {
    const message = await this.getRegistrationSuccessText();
    expect(message).toContain('Your account was created successfully');
  }
}