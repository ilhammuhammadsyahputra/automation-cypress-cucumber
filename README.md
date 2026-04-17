# Automation Web Testing — Cypress + Cucumber BDD

An end-to-end automated test suite for [SauceDemo](https://www.saucedemo.com) built with **Cypress** and **Cucumber BDD** (Gherkin syntax). This project follows a three-layer architecture: **Feature → Step Definitions → Page Objects**, ensuring tests are readable, maintainable, and scalable.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Running the Tests](#running-the-tests)
6. [Test Coverage](#test-coverage)
7. [Test Users](#test-users)
8. [Bug Reports](#bug-reports)
9. [Test Output](#test-output)
10. [Configuration](#configuration)
11. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io) | ^13.17.0 | Core E2E testing framework |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | ^22.1.0 | Enables Cucumber/Gherkin syntax in Cypress |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) | ^2.2.5 | Bundles feature files using esbuild |
| [esbuild](https://esbuild.github.io) | ^0.25.2 | Fast JavaScript bundler |

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
│   ├── e2e/
│   │   ├── features/                   # Gherkin test scenarios (.feature files)
│   │   │   ├── login.feature
│   │   │   ├── inventory.feature
│   │   │   ├── cart.feature
│   │   │   └── checkout.feature
│   │   │
│   │   └── step_definitions/           # JavaScript implementation of Gherkin steps
│   │       ├── common.steps.js         # Shared steps used across multiple features
│   │       ├── login.steps.js
│   │       ├── inventory.steps.js
│   │       ├── cart.steps.js
│   │       └── checkout.steps.js
│   │
│   ├── support/
│   │   ├── pages/                      # Page Object Model (POM)
│   │   │   ├── LoginPage.js
│   │   │   ├── InventoryPage.js
│   │   │   ├── CartPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── commands.js                 # Global Cypress custom commands
│   │   └── e2e.js                      # Support entry point, loaded before every test
│   │
│   └── fixtures/
│       └── users.json                  # Test user credentials
│
├── cypress.config.js                   # Cypress configuration file
├── package.json                        # Project dependencies and scripts
└── README.md
```

### Layer Explanation

This project uses a **three-layer architecture** to keep the codebase clean and easy to maintain:

**Layer 1 — Feature Files (`features/`)**

Written in Gherkin syntax (`Given / When / Then / And`). These files describe test scenarios in plain English, making them readable by anyone — including non-technical stakeholders. Each file maps to one page of the application.

**Layer 2 — Step Definitions (`step_definitions/`)**

These files bridge the Gherkin steps and the actual test logic. Each step definition is intentionally kept thin — it receives parameters from the feature file and delegates the work to a Page Object method. No direct `cy.get()` calls exist here.

**Layer 3 — Page Objects (`support/pages/`)**

Each page of the application has its own class file. All selectors and Cypress interactions are contained here. Method naming follows a consistent convention:
- `do*` — actions (e.g., `doLogin()`, `doClickCheckout()`)
- `validate*` — assertions (e.g., `validateOnInventoryPage()`, `validateErrorMessage()`)
- `get*` — data retrieval (e.g., `getItemPrice()`)

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

This command installs all packages listed in `package.json` into the `node_modules/` directory. This may take 30–60 seconds depending on your internet connection.

### Step 3 — Verify Cypress Installation

```bash
npx cypress verify
```

Expected output:

```
✔  Cypress verified!
    /Users/<your-user>/Library/Caches/Cypress/13.x.x/Cypress.app
```

If the verification fails, run the following to reinstall the Cypress binary:

```bash
npx cypress install
```

### Step 4 — Confirm Project is Ready

To confirm everything is set up correctly, run a quick check:

```bash
npx cypress info
```

This command displays Cypress version, available browsers, and system information. You are ready to run tests once no errors appear.

---

## Running the Tests

### Option 1 — Interactive Mode (Cypress UI)

> **Recommended for development and debugging.**

```bash
npm run test:open
```

This opens the **Cypress Test Runner** in your browser. From here you can:
- See all available feature files
- Run individual scenarios
- Watch tests execute in real time with visual feedback
- Inspect DOM elements, network requests, and console logs

**Steps after the UI opens:**
1. Select **E2E Testing**
2. Choose a browser (Chrome is recommended)
3. Click **Start E2E Testing**
4. Click any `.feature` file to run it

---

### Option 2 — Headless Mode (All Tests)

> **Recommended for CI/CD pipelines and full regression runs.**

```bash
npm test
```

Runs all test scenarios headlessly (no browser window). Results are printed directly in the terminal. Video recordings are automatically saved for every test run, and screenshots are captured on failure.

---

### Option 3 — Run a Specific Feature

Run tests for a single page only:

```bash
# Login Page
npm run test:login

# Inventory Page
npm run test:inventory

# Cart Page
npm run test:cart

# Full Checkout Flow (Step One, Step Two, Complete)
npm run test:checkout
```

---

### Option 4 — Headed Mode

```bash
npm run test:headed
```

Runs all tests with the browser window visible — useful for observing test execution without opening the full Cypress UI.

---

### Option 5 — Run by Tag

Each feature file is tagged. You can target a specific tag to run only the related tests:

```bash
# Run only login tests
npx cypress run --env tags=@login

# Run only checkout tests
npx cypress run --env tags=@checkout

# Run all tests
npx cypress run --env tags=@saucedemo
```

Available tags:

| Tag | Scope |
|-----|-------|
| `@saucedemo` | All tests |
| `@login` | Login Page |
| `@inventory` | Inventory Page |
| `@cart` | Cart Page |
| `@checkout` | Checkout Flow |

---

## Test Coverage

### Login Page — `login.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Successful login with valid credentials | ✅ Positive |
| 2 | Login fails with invalid credentials | ❌ Negative |
| 3 | Login fails for a locked out user | ❌ Negative |

### Inventory Page — `inventory.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Inventory page displays all available products | ✅ Positive |
| 2 | User can add an item to the cart from the inventory | ✅ Positive |
| 3 | Unauthenticated user is redirected to the login page | ❌ Negative |
| 4 | [Bug] problem_user sees broken product images | 🐛 Bug |

### Cart Page — `cart.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Added item is displayed correctly in the cart | ✅ Positive |
| 2 | User can proceed to checkout from the cart | ✅ Positive |
| 3 | User can remove an item from the cart | ❌ Negative |

### Checkout Flow — `checkout.feature`

| # | Scenario | Type |
|---|----------|------|
| 1 | Successfully fill in checkout information and proceed to step two | ✅ Positive |
| 2 | Cannot proceed to checkout when the form is empty | ❌ Negative |
| 3 | Order summary displays the correct item and price | ✅ Positive |
| 4 | User can complete the order by clicking Finish | ✅ Positive |
| 5 | [Bug] Accessing step two directly results in an empty order summary | 🐛 Bug |
| 6 | Order confirmation is displayed after a successful checkout | ✅ Positive |
| 7 | Clicking Back Home returns to inventory with an empty cart | ✅ Positive |
| 8 | [Bug] Checkout complete page is accessible without placing an order | 🐛 Bug |

---

## Test Users

User credentials are stored in `cypress/fixtures/users.json` and loaded at runtime via `cy.fixture()`.

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard valid user — all features work as expected |
| `locked_out_user` | `secret_sauce` | Locked account — login is blocked |
| `problem_user` | `secret_sauce` | Has broken product images — used for bug verification |

---

## Bug Reports

Three bugs were identified during test case design and are covered as dedicated test scenarios.

---

### Bug 1 — Broken Product Images (`problem_user`)

| | |
|-|-|
| **Page** | Inventory |
| **Trigger** | Log in using the `problem_user` account |
| **Actual behavior** | All product images fail to load (`naturalWidth = 0`) |
| **Expected behavior** | All product images should render correctly |
| **Test scenario** | `[Bug] problem_user sees broken product images on the inventory page` |

---

### Bug 2 — Checkout Step Two Accessible Without Completing Step One

| | |
|-|-|
| **Page** | Checkout Step Two |
| **Trigger** | Navigate directly to `/checkout-step-two.html` without going through Step One |
| **Actual behavior** | The page loads but the order summary is completely empty |
| **Expected behavior** | The user should be redirected to Step One or shown an error |
| **Test scenario** | `[Bug] Accessing checkout step two directly results in an empty order summary` |

---

### Bug 3 — Checkout Complete Page Accessible Without an Order

| | |
|-|-|
| **Page** | Checkout Complete |
| **Trigger** | Navigate directly to `/checkout-complete.html` without completing a checkout |
| **Actual behavior** | The page displays "Thank you for your order!" with no actual order placed |
| **Expected behavior** | The user should be redirected to the inventory or cart page |
| **Test scenario** | `[Bug] Checkout complete page is accessible without completing an order` |

---

## Test Output

After running tests, the following artifacts are automatically generated:

```
cypress/
├── videos/        # MP4 recording of every test run
└── screenshots/   # PNG screenshots captured on test failure
```

### Sample Terminal Output (All Passing)

```
  Login Page
    ✓ Successful login with valid credentials            (1,203ms)
    ✓ Login fails with invalid credentials                 (834ms)
    ✓ Login fails for a locked out user                    (761ms)

  Inventory Page
    ✓ Inventory page displays all available products       (952ms)
    ✓ User can add an item to the cart from the inventory  (887ms)
    ✓ Unauthenticated user is redirected to login page     (743ms)
    ✗ [Bug] problem_user sees broken product images       (1,102ms)

  ...

  14 passing (38s)
  1 failing
```

> The Bug scenarios are **expected to fail** — they document known defects in the application.

---

## Configuration

All Cypress settings are defined in `cypress.config.js`.

| Parameter | Value | Description |
|-----------|-------|-------------|
| `baseUrl` | `https://www.saucedemo.com` | The base URL prepended to all `cy.visit()` calls |
| `specPattern` | `cypress/e2e/features/**/*.feature` | Glob pattern Cypress uses to find test files |
| `supportFile` | `cypress/support/e2e.js` | Support file loaded automatically before every test |
| `viewportWidth` | `1280` | Browser viewport width in pixels |
| `viewportHeight` | `720` | Browser viewport height in pixels |
| `video` | `true` | Record a video of every test run |
| `defaultCommandTimeout` | `10000` | Maximum time (ms) Cypress waits for a command to succeed |
| `pageLoadTimeout` | `30000` | Maximum time (ms) Cypress waits for a page to fully load |

---