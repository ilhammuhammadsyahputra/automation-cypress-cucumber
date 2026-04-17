import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { CheckoutPage } from '../../support/pages/CheckoutPage.js'

const checkoutPage = new CheckoutPage()

// ===== BACKGROUND / SETUP =====

Given('I am on the checkout step one page', () => {
	checkoutPage.doNavigateToStepOne()
})

Given('I have completed checkout step one with {string} {string} {string}', (firstName, lastName, postalCode) => {
	checkoutPage.doCompleteStepOne(firstName, lastName, postalCode)
	checkoutPage.validateOnStepTwo()
})

Given('I have completed a full checkout with {string} {string} {string}', (firstName, lastName, postalCode) => {
	checkoutPage.doCompleteStepOne(firstName, lastName, postalCode)
	checkoutPage.doClickFinish()
	checkoutPage.validateOnComplete()
})

// ===== CHECKOUT STEP ONE =====

When('I enter first name {string}', (firstName) => {
	checkoutPage.doEnterFirstName(firstName)
})

When('I enter last name {string}', (lastName) => {
	checkoutPage.doEnterLastName(lastName)
})

When('I enter postal code {string}', (postalCode) => {
	checkoutPage.doEnterPostalCode(postalCode)
})

When('I click Continue', () => {
	checkoutPage.doClickContinue()
})

Then('I should be on the checkout step two page', () => {
	checkoutPage.validateOnStepTwo()
})

Then('I should see a checkout error {string}', (message) => {
	checkoutPage.validateErrorMessage(message)
})

// ===== CHECKOUT STEP TWO =====

When('I navigate directly to checkout step two', () => {
	checkoutPage.doNavigateToStepTwo()
})

When('I click the Finish button', () => {
	checkoutPage.doClickFinish()
})

Then('I should see {string} in the order summary', (itemName) => {
	checkoutPage.validateItemInSummary(itemName)
})

Then('the item total should show {string}', (totalText) => {
	checkoutPage.validateItemTotal(totalText)
})

Then('a tax amount should be displayed', () => {
	checkoutPage.validateTaxDisplayed()
})

Then('I should be on the checkout complete page', () => {
	checkoutPage.validateOnComplete()
})

Then('the cart items section should be empty or show no items', () => {
	checkoutPage.validateSummaryIsEmpty()
})

// ===== CHECKOUT COMPLETE =====

When('I navigate directly to the checkout complete page', () => {
	checkoutPage.doNavigateToComplete()
})

When('I click the {string} button', () => {
	checkoutPage.doClickBackHome()
})

Then('I should see the {string} message', (message) => {
	checkoutPage.validateCompleteMessage(message)
})

Then('the Pony Express delivery image should be visible', () => {
	checkoutPage.validatePonyExpressVisible()
})

Then('I should see the complete page', () => {
	checkoutPage.validateCompletePageVisible()
})
