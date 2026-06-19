import { test, expect } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test.describe('Scenario 3: Fund Transfer Between Accounts', () => {
  test('Transfer funds between two accounts successfully', async ({
    page, appAction,
  }) => {
    // Register and login with new account
    await appAction.login.registerAndLogin('Alice', 'Johnson');

    await appAction.openAccount.createNewSavingsAccount();
    await appAction.openAccount.verifyAccountCreationSuccess();
    const newAccountId = await appAction.openAccount.getNewAccountNumber();

    await appAction.openAccount.goToAccountsOverview();

    await appAction.transferFunds.transferFunds('100', newAccountId, newAccountId);
    await appAction.transferFunds.verifyTransferSuccess();
  });

  test('Negative: Transfer with invalid source account shows error', async ({
    page, appAction,
  }) => {
    // Register and login with new account
    await appAction.login.registerAndLogin('Bob', 'Williams');

    await appAction.transferFunds.goToTransferFunds();
    await appAction.transferFunds.transferFundsPage.amountInput.fill('100');
    await appAction.transferFunds.transferFundsPage.transferButton.click();
    await appAction.transferFunds.verifyErrorMessage('amount');
  });
});