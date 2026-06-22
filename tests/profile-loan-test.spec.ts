import { test } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test('TC05-Positive-Customer Profile Update and Loan Request - Valid flow', async ({page,appAction,}) => {
  await appAction.login.registerAndLogin('Michael', 'Brown');
  await appAction.profileUpdate.updateProfile(testData.profileUpdate);
  await appAction.profileUpdate.verifyProfileUpdateSuccess();
  await appAction.profileUpdate.requestLoan(
    testData.loan.validAmount,
    testData.loan.downPayment
  );

  await appAction.profileUpdate.verifyLoanResponseDisplayed();});

test('TC05-Negative-Customer Profile Update and Loan Request - Invalid loan amount', async ({page,appAction,}) => {
  await appAction.login.registerAndLogin('Sarah', 'Connor');
  await appAction.profileUpdate.requestLoan(
    testData.loan.invalidAmount,
    testData.loan.downPayment
  );

  await appAction.profileUpdate.verifyLoanErrorMessage('error');
});