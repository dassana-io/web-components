import { renderHook } from '@testing-library/react'
import {
	ColorManipulationTypes,
	generatePopupSelector,
	getDataTestAttributeProp,
	manipulateColor,
	TAG,
	useCreateDomElement
} from './utils'

const mockCmpName = 'input'
const mockDataTag = 'foo'
const MOCK_DIV_ID = 'mockDivId'

jest.spyOn(document.body, 'appendChild')
jest.spyOn(document.body, 'removeChild')

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

describe('generatePopupSelector', () => {
	it('should return a function that finds and returns the DOM element with the provided selector', () => {
		const popupContainerElement = document.createElement('div')
		const popupContainerId = 'popup-container'

		popupContainerElement.setAttribute('id', popupContainerId)
		document.body.appendChild(popupContainerElement)

		generatePopupSelector('#popup-container')()

		expect(document.querySelector('#popup-container')?.id).toBe(
			'popup-container'
		)
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

describe('useCreateDomElement', () => {
	afterEach(() => {
		// Jest only clears the DOM after ALL tests in the file are run, so the reset must be done manually since the DOM
		// is being manipulated in the following tests
		document.body.innerHTML = ''
	})

	it('should append a div to the document body', () => {
		const { unmount } = renderHook(() => useCreateDomElement(MOCK_DIV_ID))

		expect(document.body.appendChild).toHaveBeenCalled()

		unmount()

		expect(document.body.removeChild).toHaveBeenCalled()
	})

	it('should append the div to correct popup container if one is provided', () => {
		const popupContainerElement = document.createElement('div')
		const popupContainerId = 'popup-container'
		popupContainerElement.setAttribute('id', popupContainerId)
		document.body.appendChild(popupContainerElement)

		renderHook(() =>
			useCreateDomElement(
				MOCK_DIV_ID,
				generatePopupSelector(`#${popupContainerId}`)
			)
		)

		expect(
			document.querySelector('#popup-container')?.firstElementChild?.id
		).toBe(MOCK_DIV_ID)
	})

	it('should default the root to document.body if getPopupContainer returns null', () => {
		const { unmount } = renderHook(() =>
			useCreateDomElement(
				MOCK_DIV_ID,
				generatePopupSelector('#non-existent-selector')
			)
		)

		expect(document.body.firstElementChild?.id).toBe(MOCK_DIV_ID)

		unmount()
	})
})
