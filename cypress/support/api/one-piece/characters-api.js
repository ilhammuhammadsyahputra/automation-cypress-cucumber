import url from '../config/url.json'

export const getAllCharacters = () => {
	return cy.request({
		method: 'GET',
		url: `${url.ONE_PIECE.BASE_URL}${url.ONE_PIECE.CHARACTERS}`,
		failOnStatusCode: false,
	})
}
