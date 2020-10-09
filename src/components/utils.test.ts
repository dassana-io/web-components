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
	const mockColor = '#2F54EB'
	const mockPercent = 50
	const { fade, shade, tint } = ColorManipulationTypes

	describe('manipulateColor', () => {
		it('should tint the input color by given percentage for argument type tint', () => {
			const mockLightenedColor = manipulateColor(
				mockColor,
				mockPercent,
				tint
			)

			expect(mockLightenedColor.toUpperCase()).toBe('#97AAF5')
		})

		it('should shade the input color by given percentage for argument type shade', () => {
			const mockDarkenedColor = manipulateColor(
				mockColor,
				mockPercent,
				shade
			)

			expect(mockDarkenedColor.toUpperCase()).toBe('#182A76')
		})

		it('should fade the input color by given percentage for argument type fade', () => {
			const mockColor = 'rgba(10, 10, 10, 0.8)'
			const mockFadedColor = manipulateColor(mockColor, mockPercent, fade)

			expect(mockFadedColor).toBe('rgba(10, 10, 10, 0.4)')
		})

		it('should throw an error if percent value is out of bounds', () => {
			expect(() => {
				manipulateColor(mockColor, -1, tint)
			}).toThrow()

			expect(() => {
				manipulateColor(mockColor, 101, shade)
			}).toThrow()
		})
	})
})
