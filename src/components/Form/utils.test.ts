import { getFormFieldDataTag } from './utils'

describe('getFormFieldDataTag', () => {
	it('should return a data tag prefixed with "field"', () => {
		const tag = getFormFieldDataTag('foo')

		expect(tag).toMatch('field-foo')
	})
})
