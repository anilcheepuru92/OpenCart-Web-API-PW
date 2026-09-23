# OpenCart Web & API Playwright Framework

A reusable automation framework for testing the OpenCart web application and REST APIs with [Playwright](https://playwright.dev/) and TypeScript. The framework combines the Page Object Model (POM), custom Playwright fixtures, API request helpers, and data-driven utilities in a package that can be consumed by test projects.

[![Playwright](https://img.shields.io/badge/Playwright-1.63+-45ba4b?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ESNext-3178c6?logo=typescript)](https://www.typescriptlang.org/)

## Contents

- [Overview](#overview)
- [Technology stack](#technology-stack)
- [Features](#features)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running tests](#running-tests)
- [Reports and diagnostics](#reports-and-diagnostics)
- [Building the package](#building-the-package)
- [Docker](#docker)
- [Using the framework components](#using-the-framework-components)
- [Development guidelines](#development-guidelines)

## Overview

This repository provides the reusable building blocks and example tests needed to automate:

- OpenCart UI workflows using Playwright page objects.
- API workflows using Playwright's `APIRequestContext`.
- Data-driven scenarios using CSV, Excel, and JSON data.
- Test setup and page-object access through typed custom fixtures.
- Local, CI, Docker, and Jenkins-based execution.

The package entry point is `src/index.ts`. The compiled package is emitted to `dist/` and exposes the pages, fixtures, API helper, and data helpers for consumers.

## Technology stack

- **Language:** TypeScript (strict mode, ESNext target)
- **Test runner:** Playwright Test
- **Browser project:** Chromium by default
- **UI automation:** Playwright Page and Page Object Model
- **API automation:** Playwright `APIRequestContext`
- **Data utilities:** `csv-parse`, `xlsx`, and native JSON support
- **Configuration:** `dotenv` environment files
- **Assertions and fixtures:** Playwright Test
- **Reporting:** Playwright HTML, blob, and Allure reports
- **CI/container support:** GitHub Actions, Jenkins, Docker

## Features

- Base page with shared browser/page utilities.
- Page objects for login, home, account editing, search results, and product details.
- Typed custom Playwright fixtures for commonly used page objects and test data.
- API helper methods for `GET`, `POST`, `PUT`, and `DELETE` requests.
- CSV, Excel, and JSON data helpers.
- TypeScript declarations and source maps generated during the build.
- Screenshots on failure, videos retained on failure, and traces on the first retry.
- Configurable environments using `ENV` and `config/.env.<environment>` files.
- Headless CI execution and Docker support.

## Project structure

```text
.
├── config/
│   └── .env.example             # Environment-variable template
├── src/
│   ├── api/                     # API helper implementations
│   ├── data/                    # Test data files
│   ├── fixtures/                # Custom Playwright fixtures
│   ├── pages/                   # Page Object Model classes
│   ├── utils/                   # CSV, Excel, and JSON helpers
│   └── index.ts                 # Public package exports
├── tests/
│   ├── api/                     # API test suites
│   └── *.spec.ts                # UI and fixture-based test suites
├── config/                      # Environment configuration files
├── playwright.config.ts         # Playwright projects, reporters, and runtime options
├── tsconfig.json                # TypeScript compiler configuration
├── Dockerfile                   # Containerized Chromium test execution
├── Jenkinsfile                  # Jenkins pipeline definition
├── docker-compose.shard.yml     # Sharded Docker execution configuration
├── package.json                 # Scripts, dependencies, and package metadata
└── README.md
```

## Prerequisites

- Node.js compatible with the installed Playwright and TypeScript dependencies.
- npm.
- A reachable OpenCart application for UI tests.
- API endpoints and credentials for API tests, where required.
- Docker (optional, for containerized execution).

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/anilcheepuru92/OpenCart-Web-API-PW.git
cd OpenCart-Web-API-PW
npm ci
```

Install the Playwright browser binaries if they are not already available:

```bash
npx playwright install chromium
```

To install the published package in another Playwright/TypeScript project instead:

```bash
npm install opencart-web-api-pw
```

## Configuration

The Playwright configuration selects an environment with the `ENV` variable and loads `config/.env.<environment>` using `dotenv`. The default environment is `qa`.

Create an environment file based on the template:

```bash
cp config/.env.example config/.env.qa
```

Set the values appropriate for the target environment:

```dotenv
BASE_URL=https://your-opencart-host.example
LOGINID=your-user
PASSWORD=your-password
API_BASE_URL=https://your-api-host.example
API_TOKEN=your-api-token
GRANT_TYPE=your-grant-type
```

Do not commit passwords, tokens, or other secrets. Environment files containing credentials should remain local or be supplied securely by CI.

To use another environment, create a matching file such as `config/.env.dev` and run with `ENV=dev`.

## Running tests

Run the complete Playwright suite:

```bash
npm test
```

Run tests against a selected environment:

```bash
ENV=qa npm test
ENV=dev npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

Run only the Chromium project:

```bash
npm run test:chrome
```

Run a specific file or test using Playwright's CLI options:

```bash
npx playwright test tests/loginpage.spec.ts
npx playwright test -g "login"
```

By default, the configured Chromium project uses `BASE_URL` as its base URL. Tests run in parallel where possible. In CI, retries are enabled, workers are limited, and the browser runs headlessly.

## Reports and diagnostics

The test configuration produces Playwright HTML, blob, and Allure results. Failed tests can also retain screenshots and videos, and traces are collected on the first retry.

Open the Playwright HTML report after a run:

```bash
npx playwright show-report reports/html-report
```

Generate and open the Allure report:

```bash
npm run allure:report
```

Remove generated Allure output:

```bash
npm run allure:clean
```

Generated reports and test artifacts should not be committed to source control.

## Building the package

Compile the reusable framework code and generate declarations in `dist/`:

```bash
npm run build
```

The build includes files under `src/` and excludes tests, reports, and generated output. The package entry points are:

- JavaScript: `dist/index.js`
- TypeScript declarations: `dist/index.d.ts`

## Docker

The included Dockerfile uses the official Playwright image and runs the Chromium suite in CI mode:

```bash
docker build -t opencart-web-api-pw .
docker run --rm \
  -e BASE_URL="https://your-opencart-host.example" \
  -e LOGINID="your-user" \
  -e PASSWORD="your-password" \
  opencart-web-api-pw
```

For parallel/sharded execution, review and use `docker-compose.shard.yml` with the required environment variables.

## Using the framework components

The public exports are available from the package root. The framework exposes page objects, custom fixtures, the API helper, and data helpers.

### Page objects

Pass a Playwright `Page` to a page object and use its workflow methods:

```typescript
import { LoginPage, HomePage } from 'opencart-web-api-pw';
import { test } from '@playwright/test';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin('user@test.com', 'password');

  const homePage = new HomePage(page);
  // Continue with HomePage actions and assertions.
});
```

Available page-object exports include `BasePage`, `LoginPage`, `HomePage`, `SearchResultsPage`, `EditAccountPage`, and `ProductDetailsPage`.

### Custom fixtures

The framework provides a customized `test` object with typed page-object fixtures. Import `test` and `expect` from the package rather than directly from Playwright when using these fixtures:

```typescript
import { test, expect } from 'opencart-web-api-pw';

test('user can search for a product', async ({ homePage, searchResultsPage }) => {
  // Use the already-created typed page objects here.
  await expect(homePage.page).toBeTruthy();
  // Continue with the page-object workflow.
});
```

The available fixture properties include `basePage`, `loginPage`, `homePage`, `editAccountPage`, `searchResultsPage`, `productDetailsPage`, and `testData`. The `testData` fixture reads `src/data/loginData.csv` by default.

### API helper

Create an `APIHelper` with Playwright's `APIRequestContext` and a base URL. It supports `get`, `post`, `put`, and `delete` operations and returns the response status and parsed response body where applicable:

```typescript
import { APIHelper } from 'opencart-web-api-pw';
import { test, expect } from '@playwright/test';

test('get users', async ({ request }) => {
  const apiHelper = new APIHelper(request, 'https://api.example.com');
  const response = await apiHelper.get('/users');

  expect(response.status).toBe(200);
});
```

Requests can include headers and request data:

```typescript
const created = await apiHelper.post(
  '/users',
  { name: 'Test User' },
  { Authorization: `Bearer ${process.env.API_TOKEN}` }
);

const updated = await apiHelper.put('/users/1', { name: 'Updated User' });
const removed = await apiHelper.delete('/users/1');
```

### Data helpers

Use the exported helpers for CSV, Excel, and JSON test data:

```typescript
import { CsvHelper, ExcelHelper, JsonHelper } from 'opencart-web-api-pw';

const csvData = CsvHelper.readCsv('test-data.csv');
// Use the corresponding ExcelHelper and JsonHelper methods for .xlsx and .json data.
```

Keep test data free of secrets and use environment variables for credentials or tokens.

## Development guidelines

1. Keep selectors and page interactions inside page-object classes.
2. Reuse the custom fixtures instead of recreating common page objects in each test.
3. Keep environment-specific values in `config/.env.<environment>` files or CI secrets.
4. Add tests under `tests/` and reusable implementation code under `src/`.
5. Run `npm run build` and the relevant Playwright tests before submitting changes.
6. Avoid committing `node_modules`, `dist`, reports, traces, screenshots, videos, and secret configuration files.

## License

This project is licensed under the ISC License. See `package.json` for package metadata.
