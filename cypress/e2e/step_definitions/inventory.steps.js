import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { InventoryPage } from '../../support/pages/InventoryPage.js'

const inventoryPage = new InventoryPage()

Then('I should see {int} products on the inventory page', (count) => {
	inventoryPage.validateProductCount(count)
})

When('I add {string} to the cart', (itemName) => {
	inventoryPage.doAddItemToCart(itemName)
})

Then('product images should be visible and correctly loaded', () => {
	inventoryPage.validateProductImagesLoaded()
})
