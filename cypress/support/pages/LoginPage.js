export class LoginPage {
	doVisitLoginPage() {
		cy.visit('/')
	}

	doEnterUsername(username) {
		cy.get('[data-test="username"]').clear().type(username)
	}

	doEnterPassword(password) {
		cy.get('[data-test="password"]').clear().type(password)
	}

	doClickLoginButton() {
		cy.get('[data-test="login-button"]').click()
	}

	doLogin(username, password) {
		this.doVisitLoginPage()
		this.doEnterUsername(username)
		this.doEnterPassword(password)
		this.doClickLoginButton()
	}

	validateLoginPageVisible() {
		cy.get('[data-test="login-button"]').should('be.visible')
	}

	validateRedirectedToLoginPage() {
		cy.url().should('eq', Cypress.config('baseUrl') + '/')
		cy.get('[data-test="login-button"]').should('be.visible')
	}

	validateErrorMessage(message) {
		cy.get('[data-test="error"]').should('be.visible').and('contain.text', message)
	}
}
