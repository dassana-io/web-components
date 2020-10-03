import Color from 'color'
import {
	ColorManipulationTypes,
	getDataTestAttributeProp,
	manipulateColor,
	TAG
} from './utils'

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

describe('Color utils', () => {
	const mockColor = 'hsl(100, 50%, 50%)'
	const mockPercent = 50
	const { darken, fade, lighten } = ColorManipulationTypes

	describe('manipulateColor', () => {
		it('should lighten the input color by given percentage for argument type lighten', () => {
			const mockLightenedColor = manipulateColor(
				mockColor,
				mockPercent,
				lighten
			)

			expect(mockLightenedColor).toBe(Color('hsl(100, 50%, 75%)').hex())
		})

		it('should darken the input color by given percentage for argument type darken', () => {
			const mockDarkenedColor = manipulateColor(
				mockColor,
				mockPercent,
				darken
			)

			expect(mockDarkenedColor).toBe(Color('hsl(100, 50%, 25%)').hex())
		})

		it('should fade the input color by given percentage for argument type fade', () => {
			const mockColor = 'rgba(10, 10, 10, 0.8)'
			const mockFadedColor = manipulateColor(mockColor, mockPercent, fade)

			expect(mockFadedColor).toBe('rgba(10, 10, 10, 0.4)')
		})

		it('should throw an error if percent value is out of bounds', () => {
			expect(() => {
				manipulateColor(mockColor, -1, lighten)
			}).toThrow()

			expect(() => {
				manipulateColor(mockColor, 101, darken)
			}).toThrow()
		})
	})
})
