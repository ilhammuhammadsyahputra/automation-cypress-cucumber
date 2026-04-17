export class InventoryPage {
	doAddItemToCart(itemName) {
		cy.contains('.inventory_item_name', itemName)
			.closest('.inventory_item')
			.find('button')
			.click()
	}

	doNavigateToInventory() {
		cy.visit('/inventory.html')
	}

	validateOnInventoryPage() {
		cy.url().should('include', '/inventory.html')
		cy.get('.inventory_container').should('be.visible')
	}

	validateProductCount(count) {
		cy.get('.inventory_item').should('have.length', count)
	}

	validateCartBadge(count) {
		cy.get('.shopping_cart_badge').should('have.text', String(count))
	}

	validateCartBadgeNotVisible() {
		cy.get('.shopping_cart_badge').should('not.exist')
	}

	validateProductImagesLoaded() {
		cy.get('img.inventory_item_img').each(($img) => {
			cy.wrap($img).should('be.visible')
			cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
			cy.wrap($img).should(($image) => {
				expect($image[0].naturalWidth).to.be.greaterThan(0, 'Image failed to load (naturalWidth is 0)')
			})
		})
	}
}
