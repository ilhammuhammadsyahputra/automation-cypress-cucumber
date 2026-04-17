import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { CartPage } from '../../support/pages/CartPage.js'

const cartPage = new CartPage()

When('I click {string}', (buttonText) => {
	if (buttonText === 'Checkout') {
		cartPage.doClickCheckout()
	}
})

When('I remove {string} from the cart', (itemName) => {
	cartPage.doRemoveItem(itemName)
})

Then('I should see {string} in the cart', (itemName) => {
	cartPage.validateItemInCart(itemName)
})

Then('the cart should contain {int} item', (count) => {
	cartPage.validateCartItemCount(count)
})

Then('the cart should be empty', () => {
	cartPage.validateCartIsEmpty()
})

Then('I should be on the checkout step one page', () => {
	cartPage.validateOnCheckoutStepOne()
})

