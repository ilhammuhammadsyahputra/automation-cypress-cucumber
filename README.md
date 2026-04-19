# Automation Testing — Cypress + Cucumber BDD

A comprehensive automated test suite covering both **End-to-End (E2E) Web Testing** and **API Testing**, built with **Cypress**, **Cucumber BDD** (Gherkin syntax), and **Chai**.

- **E2E Target:** [SauceDemo](https://www.saucedemo.com) — a demo e-commerce web application
- **API Target:** [One Piece Characters API](https://api.api-onepiece.com/v2/characters/en) — a public REST API

The project follows a **three-layer architecture** (Feature → Step Definitions → Page Objects) for E2E tests, keeping scenarios readable, maintainable, and scalable.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Architecture Overview](#architecture-overview)
5. [Setup & Installation](#setup--installation)
6. [Running the Tests](#running-the-tests)
7. [Test Coverage — E2E](#test-coverage--e2e)
8. [Test Coverage — API](#test-coverage--api)
9. [Test Users](#test-users)
10. [Bug Reports](#bug-reports)
11. [Configuration](#configuration)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io) | ^13.17.0 | Core testing framework for both E2E and API |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^22.1.0 | Enables Cucumber/Gherkin syntax in Cypress |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) | ^2.2.5 | Bundles feature files and JS specs using esbuild |
| [esbuild](https://esbuild.github.io) | ^0.25.2 | Fast JavaScript bundler |
| [chai-json-schema](https://github.com/chaijs/chai-json-schema) | ^1.5.1 | JSON Schema validation for API response assertions |

---

## Prerequisites

Before getting started, make sure the following tools are installed on your machine:

- **Node.js** v18 or higher — [Download here](https://nodejs.org)
- **npm** v8 or higher — included with Node.js
- **Git** — [Download here](https://git-scm.com)

To verify your installations, run the following commands in your terminal:

```bash
node -v
npm -v
git --version
```

Expected output (versions may vary):

```
v20.11.0
10.2.4
git version 2.43.0
```

---

## Project Structure

```
automation-web-cypress-cucumber/
│
├── cypress/
│   │
│   ├── e2e/                                  # End-to-End (Web) Tests
│   │   ├── features/                         # Gherkin test scenarios (.feature files)
│   │   │   ├── login.feature
│   │   │   ├── inventory.feature
│   │   │   ├── cart.feature
│   │   │   └── checkout.feature
│   │   │
│   │   └── step_definitions/                 # JavaScript implementation of Gherkin steps
│   │       ├── common.steps.js               # Shared steps (login, navigation)
│   │       ├── login.steps.js
│   │       ├── inventory.steps.js
│   │       ├── cart.steps.js
│   │       └── checkout.steps.js
│   │
│   ├── api/                                  # API Tests (plain Cypress + Chai)
│   │   └── one-piece/
│   │       └── characters.js                 # One Piece Characters API test suite
│   │
│   ├── support/
│   │   ├── pages/                            # Page Object Model (POM)
│   │   │   ├── LoginPage.js
│   │   │   ├── InventoryPage.js
│   │   │   ├── CartPage.js
│   │   │   └── CheckoutPage.js
│   │   │
│   │   ├── api/                              # API helpers and schemas
│   │   │   ├── config/
│   │   │   │   └── url.json                  # Base URLs and endpoints
│   │   │   └── one-piece/
│   │   │       ├── characters-api.js         # cy.request() wrapper
│   │   │       └── characters-schema.js      # JSON Schema definitions
│   │   │
│   │   ├── commands.js                       # Global Cypress custom commands
│   │   └── e2e.js                            # Support entry point
│   │
│   └── fixtures/
│       └── users.json                        # Test user credentials
│
├── cypress.config.js                         # Cypress configuration
├── package.json                              # Dependencies and npm scripts
└── README.md
```

---

## Architecture Overview

### E2E Tests — Three-Layer Architecture

The E2E test suite is organized into three clear layers, ensuring separation of concerns and easy maintenance:

```
┌─────────────────────────────────────────┐
│  Layer 1: Feature Files (.feature)      │  ← Plain English, readable by everyone
│  "Given I am on the login page..."      │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│  Layer 2: Step Definitions (.steps.js)  │  ← Bridges Gherkin to Page Objects
│  Thin — delegates to Page Objects only  │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│  Layer 3: Page Objects (pages/*.js)     │  ← All selectors and Cypress commands
│  do*() / validate*() / get*() methods  │
└─────────────────────────────────────────┘
```

**Page Object method naming convention:**

| Prefix | Purpose | Example |
|--------|---------|---------|
| `do*` | Performs an action | `doLogin()`, `doClickCheckout()` |
| `validate*` | Asserts a condition | `validateOnInventoryPage()`, `validateErrorMessage()` |
| `get*` | Retrieves data | `getItemPrice()` |

### API Tests — Two-Layer Architecture

```
┌─────────────────────────────────────────┐
│  cypress/api/**/*.js                    │  ← describe/it blocks with Chai assertions
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│  cypress/support/api/                   │  ← API helpers, schemas, URL config
│  characters-api.js / characters-schema  │
└─────────────────────────────────────────┘
```

---

## Setup & Installation

### Step 1 — Clone the Repository

```bash
git clone <repository-url>
cd automation-web-cypress-cucumber
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json` into the `node_modules/` folder. This may take 30–60 seconds depending on your internet connection.

### Step 3 — Verify Cypress Installation

```bash
npx cypress verify
```

Expected output:

```
✔  Cypress verified!
    /Users/<your-user>/Library/Caches/Cypress/13.x.x/Cypress.app
```

If verification fails, reinstall the Cypress binary:

```bash
npx cypress install
```

### Step 4 — Confirm Project is Ready

```bash
npx cypress info
```

This displays your Cypress version, available browsers, and system information. You are ready to proceed when no errors appear.

---

### Step 5 — First-Time Cypress UI Setup

Run the interactive test runner:

```bash
npm run test:open
```

The first time you open Cypress, you will be prompted to complete a brief setup wizard:

**a) Choose a testing type**

Select **E2E Testing** (not Component Testing).

```
What type of testing would you like to set up?
  > E2E Testing
    Component Testing
```

**b) Review configuration files**

Cypress will display the config files it has detected (e.g., `cypress.config.js`). Click **Continue**.

**c) Select a browser**

Cypress will list all browsers detected on your machine. **Chrome** is recommended for best compatibility.

```
Choose a browser?
  > Chrome       (recommended)
    Firefox
    Electron
    Edge
```

Click **Start E2E Testing in Chrome** (or your preferred browser).

**d) macOS — Security Permission (first time only)**

On macOS, the system may block Cypress from launching the browser. If this happens:

1. Open **System Settings → Privacy & Security**
2. Scroll down to the blocked app notification and click **Allow Anyway**
3. Re-run `npm run test:open`

Alternatively, run this command to clear the macOS quarantine flag:

```bash
xattr -d com.apple.quarantine ~/Library/Caches/Cypress/<version>/Cypress.app
```

Replace `<version>` with your actual Cypress version (e.g., `13.17.0`). You can find this by running `npx cypress version`.

**e) Run your first test**

Once the browser is open, the Cypress Test Runner shows all available specs. Click any `.feature` file to run it. You will see the test steps execute in real time on the left panel, with a live browser preview on the right.

---

### Optional — Install Cypress Globally

If you prefer to run Cypress commands without `npx`, you can install Cypress globally:

```bash
npm install -g cypress
```

Then run commands directly:

```bash
cypress open
cypress run
cypress verify
```

> **Note:** Global installation is optional. The project is fully configured to work using the local `npx cypress` commands as documented above.

---

## Running the Tests

### All Tests (E2E + API)

```bash
npm test
```

Runs the full test suite headlessly. This includes all E2E feature files and all API test specs.

---

### Interactive Mode — Cypress UI

> Recommended for development and debugging.

```bash
npm run test:open
```

Opens the **Cypress Test Runner**. From here you can:
- Browse all available feature files and API spec files
- Run individual scenarios
- Watch tests execute in real time
- Inspect DOM elements, network requests, and console logs

**Steps to run in the UI:**
1. Select **E2E Testing**
2. Choose a browser (Chrome recommended)
3. Click **Start E2E Testing**
4. Click any `.feature` file (for E2E) or `characters.js` (for API)

---

### Headed Mode

```bash
npm run test:headed
```

Runs all tests with the browser window visible — useful for observing execution without opening the full Cypress UI.

---

### Run a Specific E2E Feature

```bash
# Login Page only
npm run test:login

# Inventory Page only
npm run test:inventory

# Cart Page only
npm run test:cart

# Full Checkout Flow (Step One → Step Two → Complete)
npm run test:checkout
```

---

### Run API Tests Only

```bash
npx cypress run --spec 'cypress/api/**/*.js'
```

---

### Run by Tag

Each feature is tagged. You can target a specific tag to run only the related tests:

```bash
# All E2E + API tests
npx cypress run --env tags=@saucedemo

# Login tests only
npx cypress run --env tags=@login

# API tests only
npx cypress run --env tags=@api

# One Piece API tests only
npx cypress run --env tags=@one-piece
```

**Available tags:**

| Tag | Scope |
|-----|-------|
| `@saucedemo` | All E2E tests |
| `@login` | Login Page |
| `@inventory` | Inventory Page |
| `@cart` | Cart Page |
| `@checkout` | Checkout Flow |
| `@api` | All API tests |
| `@one-piece` | One Piece Characters API |

---

## Test Coverage — E2E

### Login Page — `login.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Successful login with valid credentials | ✅ Positive |
| 2 | Login fails with invalid credentials | ❌ Negative |
| 3 | Login fails for a locked out user | ❌ Negative |

### Inventory Page — `inventory.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Inventory page displays all 6 available products | ✅ Positive |
| 2 | User can add an item to the cart from the inventory | ✅ Positive |
| 3 | Unauthenticated user is redirected to the login page | ❌ Negative |
| 4 | `[Bug]` problem_user sees broken product images | ❌ Bug |

### Cart Page — `cart.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Added item is displayed correctly in the cart | ✅ Positive |
| 2 | User can proceed to checkout from the cart | ✅ Positive |
| 3 | User can remove an item from the cart | ❌ Negative |

### Checkout Flow — `checkout.feature`

All checkout steps (Step One, Step Two, Complete) are covered in a single feature file.

| # | Scenario | Type |
|---|----------|------|
| 1 | Successfully fill in checkout information and proceed to step two | ✅ Positive |
| 2 | Cannot proceed to checkout when the form is empty | ❌ Negative |
| 3 | Order summary displays the correct item and price | ✅ Positive |
| 4 | User can complete the order by clicking Finish | ✅ Positive |
| 5 | `[Bug]` Accessing step two directly results in an empty order summary | ❌ Bug |
| 6 | Order confirmation is displayed after a successful checkout | ✅ Positive |
| 7 | Clicking Back Home returns to inventory with an empty cart | ✅ Positive |
| 8 | `[Bug]` Checkout complete page is accessible without placing an order | ❌ Bug |

**E2E Total: 18 scenarios — 13 functional tests, 2 negative tests, 3 bug reports**

---

## Test Coverage — API

### One Piece Characters API — `cypress/api/one-piece/characters.js`

**Endpoint:** `GET https://api.api-onepiece.com/v2/characters/en`

| # | Test Case | Expected Result |
|---|-----------|----------------|
| 1 | Status code should be 200 | ✅ Pass |
| 2 | Response should match the character JSON schema | ✅ Pass |
| 3 | Each character ID must be unique | ✅ Pass |
| 4 | Gum-Gum Fruit must be exclusive to Monkey D. Luffy | ✅ Pass |
| 5 | `total_prime` must equal the sum of bounty for all characters in the same crew | ❌ Fails — API data bug detected |

> **Note on Test #5:** This test is intentionally designed to fail when the API data is inconsistent. It currently detects **15 crews** where the `total_prime` value does not match the sum of individual character bounties — confirming a data quality issue in the API. The test is working correctly; the failure is a **bug report**, not a test defect.

**API Total: 5 test cases — 4 pass, 1 detects an API data bug**

---

## Test Users

User credentials are stored in `cypress/fixtures/users.json` and loaded at runtime via `cy.fixture()`.

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard valid user — all features work as expected |
| `locked_out_user` | `secret_sauce` | Locked account — login is intentionally blocked |
| `problem_user` | `secret_sauce` | Exhibits broken product images — used for bug verification |

---

## Bug Reports

This project identifies and documents **4 bugs** — 3 in the web application and 1 in the API.

---

### Bug 1 — Broken Product Images (`problem_user`)

| Field | Detail |
|-------|--------|
| **Type** | E2E — UI |
| **Page** | Inventory |
| **Trigger** | Log in using the `problem_user` account |
| **Actual Behavior** | All product images fail to load (`naturalWidth = 0`) |
| **Expected Behavior** | All product images should render correctly |
| **Test Scenario** | `[Bug] problem_user sees broken product images on the inventory page` |

---

### Bug 2 — Checkout Step Two Accessible Without Completing Step One

| Field | Detail |
|-------|--------|
| **Type** | E2E — Navigation |
| **Page** | Checkout — Step Two |
| **Trigger** | Navigate directly to `/checkout-step-two.html` without going through Step One |
| **Actual Behavior** | Page loads but the order summary is completely empty |
| **Expected Behavior** | User should be redirected to Step One or shown a validation error |
| **Test Scenario** | `[Bug] Accessing checkout step two directly results in an empty order summary` |

---

### Bug 3 — Checkout Complete Page Accessible Without an Order

| Field | Detail |
|-------|--------|
| **Type** | E2E — Navigation |
| **Page** | Checkout — Complete |
| **Trigger** | Navigate directly to `/checkout-complete.html` without completing a checkout |
| **Actual Behavior** | Page displays "Thank you for your order!" with no actual order placed |
| **Expected Behavior** | User should be redirected to the inventory or cart page |
| **Test Scenario** | `[Bug] Checkout complete page is accessible without completing an order` |

---

### Bug 4 — Stale `total_prime` Values in the One Piece API

| Field | Detail |
|-------|--------|
| **Type** | API — Data Quality |
| **Endpoint** | `GET /v2/characters/en` |
| **Trigger** | Compare `crew.total_prime` against the sum of all `bounty` values per `crew_id` |
| **Actual Behavior** | 15 crews have a mismatch — `total_prime` does not equal the sum of member bounties |
| **Expected Behavior** | `total_prime` should always equal the sum of all crew member bounties |
| **Example** | Crew "The Chapeau de Paille crew": `total_prime = 3,161,000,100` but `bounty_sum = 8,806,001,000` |
| **Test Scenario** | `total_prime must equal the sum of bounty for all characters in the same crew` |

---

### Sample Terminal Output

```
  One Piece Characters API
    ✓ Status code should be 200                                              (4016ms)
    ✓ Response should match the character JSON schema                          (13ms)
    ✓ Each character ID must be unique                                          (8ms)
    ✓ Gum-Gum Fruit must be exclusive to Monkey D. Luffy                       (8ms)
    ✗ total_prime must equal the sum of bounty for all characters in the same crew

  Login Page
    ✓ Successful login with valid credentials                               (1,203ms)
    ✓ Login fails with invalid credentials                                    (834ms)
    ✓ Login fails for a locked out user                                       (761ms)

  ...

  ┌──────────────────────────────────────────────────┐
  │  Tests:     23  Passing: 19  Failing: 4          │
  └──────────────────────────────────────────────────┘
```

### Intentionally Failing Scenarios

The **4 failing tests** are not broken automation — they are scenarios **deliberately written to fail** as required by the test specification (Section B, Point 2: *"Identify at least two bugs across the entire website"*). Each failure confirms the existence of a real defect.

| # | Scenario | Location | Why It Fails |
|---|----------|----------|--------------|
| 1 | `[Bug] problem_user sees broken product images on the inventory page` | `inventory.feature` | The `problem_user` account serves broken images — `naturalWidth = 0` for all products |
| 2 | `[Bug] Accessing checkout step two directly results in an empty order summary` | `checkout.feature` | Navigating directly to `/checkout-step-two.html` bypasses Step One, resulting in an empty order |
| 3 | `[Bug] Checkout complete page is accessible without completing an order` | `checkout.feature` | Navigating directly to `/checkout-complete.html` displays "Thank you for your order!" with no order placed |
| 4 | `total_prime must equal the sum of bounty for all characters in the same crew` | `characters.js` (API) | The API's `total_prime` values are outdated — 15 crews have a mismatch against the sum of member bounties |

> These scenarios will automatically **pass** if the underlying defects are resolved by the application or API owners.

---

## Configuration

All Cypress settings are defined in `cypress.config.js`.

| Parameter | Value | Description |
|-----------|-------|-------------|
| `baseUrl` | `https://www.saucedemo.com` | Base URL for all `cy.visit()` calls in E2E tests |
| `specPattern` | `features/**/*.feature`, `api/**/*.js` | Glob patterns Cypress uses to discover test files |
| `supportFile` | `cypress/support/e2e.js` | Support file loaded automatically before every test |
| `viewportWidth` | `1280` | Browser viewport width in pixels |
| `viewportHeight` | `720` | Browser viewport height in pixels |
| `video` | `true` | Records an MP4 video of every test run |
| `screenshotOnRunFailure` | `true` | Captures a PNG screenshot on every test failure |
| `defaultCommandTimeout` | `10000ms` | Maximum time Cypress waits for a DOM command to succeed |
| `pageLoadTimeout` | `60000ms` | Maximum time Cypress waits for a full page load |
| `blockHosts` | `events.backtrace.io` | Blocks third-party analytics requests to prevent timeout noise |

---