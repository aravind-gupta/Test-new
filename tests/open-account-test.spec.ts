import { test, expect } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test.describe('Scenario 2: Open New Account and Verify Account Creation', () => {
  test('Create Savings Account and verify in Accounts Overview', async ({
    page, appAction,
  }) => {
    // Register and login with new account
    await appAction.login.registerAndLogin('John', 'Doe');

    await appAction.openAccount.createNewSavingsAccount();
    await appAction.openAccount.verifyAccountCreationSuccess();

    const newAccountNumber = await appAction.openAccount.getNewAccountNumber();
    expect(newAccountNumber).not.toBe('');

    await appAction.openAccount.goToAccountsOverview();
    await appAction.openAccount.verifyAccountNumberDisplayed(newAccountNumber);
  });

  test('Negative: Login with blank username and password shows error', async ({
    page, appAction,
  }) => {
    await page.goto(testData.baseUrl);
    await appAction.login.loginWithCredentials('', '');
    await appAction.login.verifyErrorMessage('Please enter a username and password.');
  });
});