import { Page, expect } from '@playwright/test';
import { LoginPage } from '../Page/login-page';
import RegistrationData from '../Testdata/registration.json';
import { RegistrationAction } from './registration-Action';

export class LoginAction {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async logout() {
    await this.loginPage.logoutLink.click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.loginPage.loginUsername.fill(username);
    await this.loginPage.loginPassword.fill(password);
    await this.loginPage.loginButton.click();
    // Wait for account services page to fully load after login
    await this.page.waitForLoadState('networkidle');
  }

  // async registerAndLogin(firstName: string, lastName: string) {
  //   // Generate unique credentials
  //   const uniqueId = Date.now();
  //   const username = `user_${uniqueId}`;
  //   const password = `Pass@${uniqueId}`;

  //   // Navigate to registration page
  //   await this.page.goto(RegistrationData.baseUrl);
  //   await this.page.waitForLoadState('networkidle');

  //   // Register new account
  //   const registrationAction = new RegistrationAction(this.page);
  //   await registrationAction.registerNewCustomer({
  //     firstName,
  //     lastName,
  //     address: '123 Test Street',
  //     city: 'Test City',
  //     state: 'TS',
  //     zipCode: '12345',
  //     phone: '5551234567',
  //     ssn: '123456789',
  //     username,
  //     password,
  //   });

  //   await registrationAction.verifyRegistrationSuccess();

  //   // Navigate to login page and login
  //   await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  //   await this.page.waitForLoadState('load');
  //   // Wait for login form to be visible
  //   await expect(this.loginPage.loginUsername).toBeVisible();
    
  //   await this.loginWithCredentials(username, password);

  //   return { username, password };
  // }

  async registerAndLogin(firstName: string, lastName: string) {
  const uniqueId = Date.now();
  const username = `user_${uniqueId}`;
  const password = `Pass@${uniqueId}`;

  await this.page.goto(RegistrationData.baseUrl);

  const registrationAction = new RegistrationAction(this.page);

  await registrationAction.registerNewCustomer({
    firstName,
    lastName,
    address: '123 Test Street',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345',
    phone: '5551234567',
    ssn: '123456789',
    username,
    password,
  });

  await registrationAction.verifyRegistrationSuccess();

  // Registration automatically logs the user in.
  await expect(this.loginPage.accountServicesHeading).toBeVisible();

  return { username, password };
}

  async verifyNavigatedToAccountServices() {
    await expect(this.loginPage.accountServicesHeading).toBeVisible();
  }

  async getWelcomeMessage(): Promise<string> {
    return (await this.loginPage.welcomeMessage.textContent()) ?? '';
  }

  async verifyWelcomeMessage(firstName: string, lastName: string) {
  const welcomeText = await this.getWelcomeMessage();
  expect(welcomeText).toContain(`Welcome ${firstName} ${lastName}`);
}

async verifyErrorMessage(expectedMessage: string) {
  const errorLocator = this.page.locator('.error');
  await expect(errorLocator).toContainText(expectedMessage);
}

}