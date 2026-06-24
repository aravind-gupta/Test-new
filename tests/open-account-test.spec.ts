import { test, expect } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
});
 
test('Open New Account and Verify Account Creation ', async ({ appAction }) => {
  await appAction.login.registerAndLogin('Alice', 'Johnson');
 
  await appAction.openAccount.createNewSavingsAccount();
 
  await appAction.openAccount.verifyAccountCreationSuccess();
 
  const accountId =
    await appAction.openAccount.getNewAccountNumber();
 
  await appAction.openAccount.goToAccountsOverview();
 
  await appAction.transferFunds.transfer(
    '100',
    accountId,
    accountId
  );
 
  await appAction.transferFunds.verifySuccess();
});