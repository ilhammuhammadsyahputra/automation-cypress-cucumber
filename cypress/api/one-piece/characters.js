import chaiJsonSchema from 'chai-json-schema'
import { getAllCharacters } from '../../support/api/one-piece/characters-api.js'
import { charactersResponseSchema } from '../../support/api/one-piece/characters-schema.js'

chai.use(chaiJsonSchema)

// Parse bounty string "3.000.000.000" → 3000000000
const parsePrimeString = (val) => {
	if (!val || val === '') return 0
	return parseInt(String(val).replace(/\./g, ''), 10) || 0
}

describe('One Piece Characters API', { tags: ['@api', '@one-piece'] }, () => {
	let response = null
	let characters = []

	before(() => {
		getAllCharacters().then((res) => {
			expect(res.status).to.equal(200, 'API should return status 200 before running tests')
			response = res
			characters = res.body
			cy.log(`Loaded ${characters.length} characters from API`)
		})
	})

	it('Status code should be 200', () => {
		expect(response.status).to.equal(200)
		cy.log(`Response status: ${response.status}`)
	})

	it('Response should match the character JSON schema', () => {
		expect(response.body).to.be.jsonSchema(charactersResponseSchema)
		cy.log(`Schema validated for ${response.body.length} characters`)
	})

	it('Each character ID must be unique', () => {
		const ids = characters.map((c) => c.id)
		const uniqueIds = new Set(ids)

		expect(uniqueIds.size).to.equal(
			ids.length,
			`Expected all IDs to be unique, but found ${ids.length - uniqueIds.size} duplicate(s)`
		)

		cy.log(`Validated ${ids.length} character IDs — all unique`)
	})

	it('Gum-Gum Fruit must be exclusive to Monkey D. Luffy', () => {
		const nonLuffyGumGum = characters.filter(
			(c) => c.fruit?.name === 'Gum-Gum Fruit' && !c.name.includes('Luffy')
		)

		expect(
			nonLuffyGumGum,
			`Gum-Gum Fruit found on non-Luffy character(s): ${nonLuffyGumGum.map((c) => c.name).join(', ')}`
		).to.have.length(0)

		const gumGumOwner = characters.find((c) => c.fruit?.name === 'Gum-Gum Fruit')
		cy.log(
			gumGumOwner
				? `Gum-Gum Fruit is exclusively owned by: ${gumGumOwner.name}`
				: 'Gum-Gum Fruit not present in dataset (API uses updated fruit name)'
		)
	})

	it('total_prime must equal the sum of bounty for all characters in the same crew', () => {
		const crewMap = {}
		characters.forEach((c) => {
			if (c.crew?.id != null) {
				if (!crewMap[c.crew.id]) crewMap[c.crew.id] = []
				crewMap[c.crew.id].push(c)
			}
		})

		const mismatches = []
		let validatedCrews = 0
		let skippedCrews = 0

		Object.entries(crewMap).forEach(([crewId, members]) => {
			const crewTotalPrime = parsePrimeString(members[0].crew.total_prime)

			// Skip crews with unknown/null total_prime (API returns 'inconnu' for unknown values)
			if (crewTotalPrime === 0) {
				skippedCrews++
				return
			}

			const bountySum = members.reduce((sum, c) => sum + parsePrimeString(c.bounty), 0)

			if (bountySum !== crewTotalPrime) {
				mismatches.push(
					`crew_id ${crewId} ("${members[0].crew.name}"): total_prime=${crewTotalPrime}, bounty_sum=${bountySum}, diff=${Math.abs(bountySum - crewTotalPrime)}`
				)
			}

			validatedCrews++
		})

		cy.log(
			`Validated ${validatedCrews} crews | Skipped ${skippedCrews} (unknown total_prime) | Mismatches: ${mismatches.length}`
		)

		if (mismatches.length > 0) {
			cy.log(`[BUG] API data inconsistency detected in ${mismatches.length} crew(s):`)
			mismatches.forEach((msg) => cy.log(`  - ${msg}`))
		}

		expect(
			mismatches.length,
			`[BUG] total_prime mismatch in ${mismatches.length} crew(s):\n${mismatches.join('\n')}`
		).to.equal(0)
	})
})
