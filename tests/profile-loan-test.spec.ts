import { test } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test.describe('Scenario 5: Customer Profile Update and Loan Request', () => {
  test('Update profile and submit valid loan request', async ({
    page, appAction,
  }) => {
    await appAction.login.registerAndLogin('Michael', 'Brown');

    await appAction.profileUpdate.updateProfile(testData.profileUpdate);
    await appAction.profileUpdate.verifyProfileUpdateSuccess();

    // ✅ No hardcoded account ID - dropdown uses its existing valid account
    await appAction.profileUpdate.requestLoan(
      testData.loan.validAmount,
      testData.loan.downPayment
    );

    await appAction.profileUpdate.verifyLoanResponseDisplayed();
  });

  test('Negative: Loan request with invalid amount shows error', async ({
    page, appAction,
  }) => {
    await appAction.login.registerAndLogin('Sarah', 'Connor');

    await appAction.profileUpdate.requestLoan(
      testData.loan.invalidAmount,
      testData.loan.downPayment
    );

    await appAction.profileUpdate.verifyLoanErrorMessage('error');
  });
});