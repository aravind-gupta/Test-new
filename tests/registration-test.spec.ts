import { test } from '../src/Fixture/fixture';
import customerData from '../src/Testdata/registration.json';

test('TC01-New Customer Registration, Logout, Login and Validation', async ({page,appAction,}) => {
  const uniqueId = Date.now();
  const username = `Arvind_${uniqueId}`;
  const password = `Test@${uniqueId}`;

  await page.goto(customerData.baseUrl);
  await appAction.register.registerNewCustomer({...customerData.customer,username,password,});
  await appAction.register.verifyRegistrationSuccess();
  await appAction.login.logout();
  await page.goto(customerData.baseUrl);
  await appAction.login.loginWithCredentials(username, password);
  await appAction.login.verifyNavigatedToAccountServices();
  await appAction.login.verifyWelcomeMessage(customerData.customer.firstName,customerData.customer.lastName);
});
