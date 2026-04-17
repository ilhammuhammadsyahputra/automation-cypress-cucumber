export class CheckoutPage {
	doNavigateToStepOne() {
		cy.get('.shopping_cart_link').click()
		cy.get('[data-test="checkout"]').click()
	}

	doNavigateToStepTwo() {
		cy.visit('/checkout-step-two.html')
	}

	doNavigateToComplete() {
		cy.visit('/checkout-complete.html')
	}

	doEnterFirstName(firstName) {
		cy.get('[data-test="firstName"]').clear().type(firstName)
	}

	doEnterLastName(lastName) {
		cy.get('[data-test="lastName"]').clear().type(lastName)
	}

	doEnterPostalCode(postalCode) {
		cy.get('[data-test="postalCode"]').clear().type(postalCode)
	}

	doClickContinue() {
		cy.get('[data-test="continue"]').click()
	}

	doClickFinish() {
		cy.get('[data-test="finish"]').click()
	}

	doClickBackHome() {
		cy.get('[data-test="back-to-products"]').click()
	}

	doCompleteStepOne(firstName, lastName, postalCode) {
		this.doNavigateToStepOne()
		this.doEnterFirstName(firstName)
		this.doEnterLastName(lastName)
		this.doEnterPostalCode(postalCode)
		this.doClickContinue()
	}

	validateOnStepOne() {
		cy.url().should('include', '/checkout-step-one.html')
	}

	validateOnStepTwo() {
		cy.url().should('include', '/checkout-step-two.html')
	}

	validateOnComplete() {
		cy.url().should('include', '/checkout-complete.html')
	}

	validateErrorMessage(message) {
		cy.get('[data-test="error"]').should('be.visible').and('contain.text', message)
	}

	validateItemInSummary(itemName) {
		cy.get('.inventory_item_name').should('contain.text', itemName)
	}

	validateItemTotal(totalText) {
		cy.get('.summary_subtotal_label').should('contain.text', totalText)
	}

	validateTaxDisplayed() {
		cy.get('.summary_tax_label')
			.should('be.visible')
			.invoke('text')
			.should('match', /Tax: \$\d+\.\d+/)
	}

	validateSummaryIsEmpty() {
		cy.get('.cart_item').should('not.exist')
	}

	validateCompleteMessage(message) {
		cy.get('.complete-header').should('be.visible').and('contain.text', message)
	}

	validatePonyExpressVisible() {
		cy.get('.pony_express').should('be.visible')
	}

	validateCompletePageVisible() {
		cy.url().should('include', '/checkout-complete.html')
		cy.get('.complete-header').should('be.visible')
	}
}
