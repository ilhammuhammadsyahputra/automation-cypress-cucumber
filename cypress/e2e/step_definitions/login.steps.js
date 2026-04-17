import { When } from '@badeball/cypress-cucumber-preprocessor'
import { LoginPage } from '../../support/pages/LoginPage.js'

const loginPage = new LoginPage()

When('I enter username {string} and password {string}', (username, password) => {
	loginPage.doEnterUsername(username)
	loginPage.doEnterPassword(password)
})

When('I click the login button', () => {
	loginPage.doClickLoginButton()
})
