import { test, expect } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test('TC02-Create Savings Account and verify in Accounts Overview', async ({ appAction }) => {
  
  await appAction.login.registerAndLogin('John', 'Doe');
  await appAction.openAccount.createNewSavingsAccount();
  await appAction.openAccount.submitOpenAccount();
  await appAction.openAccount.verifyAccountCreationSuccess();
  const accountNumber = await appAction.openAccount.getNewAccountNumber();
  expect(accountNumber).not.toBe('');
  await appAction.openAccount.goToAccountsOverview();
  await appAction.openAccount.verifyAccountNumberDisplayed(accountNumber);
});
