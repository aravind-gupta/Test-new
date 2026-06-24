# ParaBank Playwright POM

End-to-end Playwright test automation for the ParaBank demo application using the Page Object Model (POM) pattern.

## Overview

This repository contains UI automation for the ParaBank website via Playwright. It is structured using page objects, actions, fixtures, and test suites to make tests maintainable and reusable.

## Key Features

- Playwright test runner with HTML reporting
- Page Object Model architecture
- Test data stored in JSON fixtures
- Browser configuration for Chromium
- Screenshots, video, and trace capture on failures

## Repository Structure

- `src/Page/` - Page object definitions for application screens
- `src/Action/` - Reusable action classes that interact with page objects
- `src/Fixture/` - Fixture setup and test data helpers
- `src/TestData/` - JSON files with test data for registration and other flows
- `tests/` - Playwright test suites
- `playwright.config.ts` - Playwright configuration
- `package.json` - NPM scripts and dependencies
- `playwright-report/` - Generated Playwright HTML report output

## Prerequisites

- Node.js installed (recommended version 18+)
- Chrome installed for Chromium-based execution

## Install Dependencies

```bash
npm install
```

## Available Scripts

- `npm test` - Run all Playwright tests
- `npm run test:headed` - Run tests with a visible browser window
- `npm run test:registration` - Run only the registration test suite
- `npm run report` - Open the generated Playwright HTML report

## Run Tests

Run the full test suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run a single test file:

```bash
npm run test:registration
```

## Playwright Report

After test execution, open the HTML report with:

```bash
npm run report
```

Then open the browser window that appears or navigate to `playwright-report/index.html`.

## Configuration

The project uses `playwright.config.ts` with:

- baseURL: `https://parabank.parasoft.com/parabank/`
- headless: `false`
- screenshot: `only-on-failure`
- video: `retain-on-failure`
- trace: `retain-on-failure`
- Chromium project using Desktop Chrome

## Notes

- Tests are located in `tests/` and use the POM classes from `src/`
- Test data is managed in `src/TestData/`
- Reports are generated into `playwright-report/`

## Recommended Workflow

1. Install dependencies
2. Update test data if needed
3. Run `npm test`
4. Review failures with screenshots, videos, and traces
5. Open `npm run report` for the full HTML report
