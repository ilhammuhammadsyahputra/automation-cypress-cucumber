import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LoginPage } from '../../support/pages/LoginPage.js'
import { InventoryPage } from '../../support/pages/InventoryPage.js'

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()

Given('I am on the login page', () => {
	loginPage.doVisitLoginPage()
	loginPage.validateLoginPageVisible()
})

Given('I am logged in as {string}', (userType) => {
	cy.fixture('users').then((users) => {
		const user = userType === 'problem_user' ? users.problemUser : users.validUser
		loginPage.doLogin(user.username, user.password)
		inventoryPage.validateOnInventoryPage()
	})
})

Given('I am not logged in', () => {
	cy.clearCookies()
	cy.clearLocalStorage()
})

Given('I have added {string} to the cart', (itemName) => {
	inventoryPage.doAddItemToCart(itemName)
})

When('I navigate directly to the inventory page', () => {
	inventoryPage.doNavigateToInventory()
})

When('I navigate to the cart page', () => {
	cy.get('.shopping_cart_link').click()
})

Then('I should be redirected to the login page', () => {
	loginPage.validateRedirectedToLoginPage()
})

Then('I should be redirected to the inventory page', () => {
	inventoryPage.validateOnInventoryPage()
})

Then('I should be redirected back to the inventory page', () => {
	inventoryPage.validateOnInventoryPage()
})

Then('the cart badge should show {string}', (count) => {
	inventoryPage.validateCartBadge(count)
})

Then('the cart badge should not be visible', () => {
	inventoryPage.validateCartBadgeNotVisible()
})

Then('I should see an error message {string}', (message) => {
	loginPage.validateErrorMessage(message)
})
