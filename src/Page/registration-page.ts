// import { Page, Locator } from '@playwright/test';

// export class RegistrationPage {
//   readonly page: Page;

//   readonly registerLink: Locator;
//   readonly firstName: Locator;
//   readonly lastName: Locator;
//   readonly address: Locator;
//   readonly city: Locator;
//   readonly state: Locator;
//   readonly zipCode: Locator;
//   readonly phone: Locator;
//   readonly ssn: Locator;
//   readonly username: Locator;
//   readonly password: Locator;
//   readonly confirmPassword: Locator;
//   readonly registerButton: Locator;
//   readonly registerSuccessMessage: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.registerLink = page.getByRole('link', { name: 'Register' }); 
//     this.firstName = page.locator('#customer\\.firstName');
//     this.lastName = page.locator('#customer\\.lastName');
//     this.address = page.locator('#customer\\.address\\.street');
//     this.city = page.locator('#customer\\.address\\.city');
//     this.state = page.locator('#customer\\.address\\.state');
//     this.zipCode = page.locator('#customer\\.address\\.zipCode');
//     this.phone = page.locator('#customer\\.phoneNumber');
//     this.ssn = page.locator('#customer\\.ssn');
//     this.username = page.locator('#customer\\.username');
//     this.password = page.locator('#customer\\.password');
//     this.confirmPassword = page.locator('#repeatedPassword');
//     this.registerButton = page.getByRole('button', { name: 'Register' });
//     this.registerSuccessMessage = page.locator('text=Your account was created successfully');
//   }
// }


import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly registerLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly registerSuccessMessage: Locator;
  readonly cloudflareChallenge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.address = page.locator('#customer\\.address\\.street');
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zipCode = page.locator('#customer\\.address\\.zipCode');
    this.phone = page.locator('#customer\\.phoneNumber');
    this.ssn = page.locator('#customer\\.ssn');
    this.username = page.locator('#customer\\.username');
    this.password = page.locator('#customer\\.password');
    this.confirmPassword = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.registerSuccessMessage = page.locator('text=Your account was created successfully');

    // Cloudflare's "Performing security verification" interstitial
    this.cloudflareChallenge = page.getByText('Performing security verification');
  }
}