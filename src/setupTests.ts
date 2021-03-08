import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

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
