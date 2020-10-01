import Color from 'color'
import {
	fadeColor,
	getDataTestAttributeProp,
	lightenOrDarkenColor,
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

	describe('lightenOrDarkenColor', () => {
		it('should lighten the input color by given percentage if colorChangeType is not provided', () => {
			const mockLightenedColor = lightenOrDarkenColor(
				mockColor,
				mockPercent
			)

			expect(mockLightenedColor).toBe(Color('hsl(100, 50%, 75%)').hex())
		})

		it('should darken the input color by given percentage if colorChangeType is provided as "dark"', () => {
			const mockDarkenedColor = lightenOrDarkenColor(
				mockColor,
				mockPercent,
				'dark'
			)

			expect(mockDarkenedColor).toBe(Color('hsl(100, 50%, 25%)').hex())
		})

		it('should throw an error if percent value is out of bounds', () => {
			expect(() => {
				lightenOrDarkenColor(mockColor, -1)
			}).toThrow()

			expect(() => {
				lightenOrDarkenColor(mockColor, 101)
			}).toThrow()
		})
	})

	describe('fadeColor', () => {
		it('should fade color by given percentage', () => {
			const mockColor = 'rgba(10, 10, 10, 0.8)'
			const mockFadedColor = fadeColor(mockColor, mockPercent)

			expect(mockFadedColor).toBe('rgba(10, 10, 10, 0.4)')
		})

		it('should throw an error if percent value is out of bounds', () => {
			expect(() => {
				fadeColor(mockColor, -1)
			}).toThrow()

			expect(() => {
				fadeColor(mockColor, 101)
			}).toThrow()
		})
	})
})
