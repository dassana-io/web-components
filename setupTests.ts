import '@testing-library/jest-dom'

beforeAll(() => {
	window.matchMedia = query => ({
		addEventListener: jest.fn(),
		addListener: jest.fn(), // deprecated
		dispatchEvent: jest.fn(),
		matches: false,
		media: query,
		onchange: null,
		removeEventListener: jest.fn(),
		removeListener: jest.fn() // deprecated
	})
})
