export const characterSchema = {
	type: 'object',
	required: ['id', 'name'],
	properties: {
		id: { type: 'number' },
		name: { type: 'string' },
		size: { type: ['string', 'null'] },
		age: { type: ['string', 'null'] },
		bounty: { type: ['string', 'null'] },
		job: { type: ['string', 'null'] },
		status: { type: ['string', 'null'] },
		crew: {
			type: ['object', 'null'],
			properties: {
				id: { type: 'number' },
				name: { type: 'string' },
				total_prime: { type: ['string', 'null'] },
				is_yonko: { type: 'boolean' },
			},
		},
		fruit: {
			type: ['object', 'null'],
			properties: {
				id: { type: 'number' },
				name: { type: 'string' },
				type: { type: ['string', 'null'] },
			},
		},
	},
}

export const charactersResponseSchema = {
	type: 'array',
	items: characterSchema,
}
