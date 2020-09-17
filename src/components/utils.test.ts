import { getDataTestAttributeProp, TAG } from './utils'

const mockCmpName = 'input'
const mockDataTag = 'foo'

describe('getDataTestAttributeProp', () => {
	it('should return a data attribute with the component name by default', () => {
		const attr = getDataTestAttributeProp(mockCmpName)

		expect(attr).toMatchObject({ [TAG]: mockCmpName })
	})

	it('should return a data attribute with the data tag appended if one is passed in', () => {
		const attr = getDataTestAttributeProp(mockCmpName, mockDataTag)

		expect(attr).toMatchObject({
			[TAG]: `${mockCmpName}-${mockDataTag}`
		})
	})
})
