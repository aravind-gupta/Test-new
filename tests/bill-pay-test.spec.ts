import { test } from '../src/Fixture/fixture';
import testData from '../src/Testdata/testdata.json';

test.describe('Scenario 4: Bill Payment and Transaction Verification', () => {
  test('Pay bill and verify transaction record', async ({
    page, appAction,
  }) => {
    // Register and login with new account
    await appAction.login.registerAndLogin('Jane', 'Smith');

    await appAction.billPay.payBill({
      payeeName: testData.payee.payeeName,
      address: testData.payee.address,
      city: testData.payee.city,
      state: testData.payee.state,
      zipCode: testData.payee.zipCode,
      phone: testData.payee.phone,
      accountNumber: '12345',
      amount: testData.payee.amount,
    });

    await appAction.billPay.verifyPaymentSuccess();

    await appAction.billPay.goToFindTransactions();
    await appAction.billPay.findTransactionByAmount(testData.payee.amount);
    await appAction.billPay.verifyTransactionRecordExists(testData.payee.amount);
  });
});