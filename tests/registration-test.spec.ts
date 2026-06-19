import { test, expect } from '../src/Fixture/fixture';
import customerData from '../src/Testdata/registration.json';

test.describe('Scenario 1: New Customer Registration and Login Validation', () => {
  const uniqueId = Date.now();
  const username = `user_${uniqueId}`;
  const password = `Pass@${uniqueId}`;

  test('Register, Logout, Login and Validate Account Services', async ({page, appAction,}) => {
    await page.goto(customerData.baseUrl);
    await appAction.register.registerNewCustomer({...customerData.customer,username,password,});
    await appAction.register.verifyRegistrationSuccess();
    await appAction.login.logout();
    
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await appAction.login.loginWithCredentials(username, password);
    await appAction.login.verifyNavigatedToAccountServices();
    await appAction.login.verifyWelcomeMessage(customerData.customer.firstName,customerData.customer.lastName);
  });
});