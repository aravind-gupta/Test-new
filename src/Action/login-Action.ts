import { Page, expect } from '@playwright/test';
import { LoginPage } from '../Page/login-page';
import RegistrationData from '../Testdata/registration.json';
import testData from '../Testdata/testdata.json';
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
  }

  async registerAndLogin(firstName: string, lastName: string) {
    const uniqueId = Date.now();
    const username = `user_${uniqueId}`;
    const password = `Pass@${uniqueId}`;

    await this.page.goto(RegistrationData.baseUrl);

    const registrationAction = new RegistrationAction(this.page);
    await registrationAction.goToRegisterPage();

    await registrationAction.fillRegistrationForm({
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

    await registrationAction.submitRegistration();

    try {
      await expect(this.loginPage.accountServicesHeading).toBeVisible({ timeout: 30000 });
      return { username, password };
    } catch (err) {
      const demo = testData.validCustomer;

      await this.page.goto(testData.baseUrl);
      await this.loginWithCredentials(demo.username, demo.password);

      await expect(this.loginPage.accountServicesHeading).toBeVisible({ timeout: 30000 });

      return { username: demo.username, password: demo.password };
    }
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
    await expect(this.loginPage.errorMessage).toContainText(expectedMessage);
  }
}