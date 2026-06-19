import { test as base, expect } from "@playwright/test";
import { LoginAction } from "../Action/login-Action";
import { RegistrationAction } from "../Action/registration-Action";
import RegistrationData from "../Testdata/registration.json";
import { OpenAccountAction } from "../Action/open-account-Action";
import { TransferFundsAction } from "../Action/transfer-funds-Action";
import { BillPayAction } from "../Action/bill-pay-Action";
import { ProfileUpdateAction } from "../Action/profile-update-Action";

type AppActions = {
    login: LoginAction;
    register: RegistrationAction;
    openAccount: OpenAccountAction;
    transferFunds: TransferFundsAction;
    billPay: BillPayAction;
    profileUpdate: ProfileUpdateAction;  
};

type Fixtures = {
    gotoBaseUrl: void;
    appAction: AppActions;
};

export const test = base.extend<Fixtures>({
    gotoBaseUrl: [
        async ({ page }, use) => {
            await page.goto(RegistrationData.baseUrl);
            await expect(page).toHaveURL(RegistrationData.baseUrl);
            await use();
        },
        { auto: false },
    ],

    appAction: async ({ page }, use) => {

        const appAction: AppActions = {
            login: new LoginAction(page),
            register: new RegistrationAction(page),
            openAccount: new OpenAccountAction(page),
            transferFunds: new TransferFundsAction(page),
            billPay: new BillPayAction(page),
            profileUpdate: new ProfileUpdateAction(page),
        };
        await use(appAction);
    },
});

export { expect } from "@playwright/test";