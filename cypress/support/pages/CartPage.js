export class CartPage {
	doNavigateToCart() {
		cy.get('.shopping_cart_link').click()
	}

	doRemoveItem(itemName) {
		cy.contains('.inventory_item_name', itemName)
			.closest('.cart_item')
			.find('button[data-test^="remove"]')
			.click()
	}

	doClickCheckout() {
		cy.get('[data-test="checkout"]').click()
	}

	validateOnCartPage() {
		cy.url().should('include', '/cart.html')
	}

	validateItemInCart(itemName) {
		cy.get('.inventory_item_name').should('contain.text', itemName)
	}

	validateCartItemCount(count) {
		cy.get('.cart_item').should('have.length', count)
	}

	validateCartIsEmpty() {
		cy.get('.cart_item').should('not.exist')
	}

	validateCartBadgeNotVisible() {
		cy.get('.shopping_cart_badge').should('not.exist')
	}

	validateOnCheckoutStepOne() {
		cy.url().should('include', '/checkout-step-one.html')
	}
}
