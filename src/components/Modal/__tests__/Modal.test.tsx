import { act } from 'react-dom/test-utils'
import { IconButton } from '../../IconButton'
import Modal from '../Modal'
import { ModalOptions } from '../utils'
import { ModalProvider } from 'components/Modal'
import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

const mockDassanaEmitter = {
	emit: jest.fn(),
	emitNotificationEvent: jest.fn(),
	off: jest.fn(),
	on: jest.fn()
} as jest.Mocked<any>

const mockMessage = 'Hello World'
const mockModalContent = <div>{mockMessage}</div>

const unsetModalSpy = jest.fn()

const getWrapper = (options: ModalOptions = {}, mountOptions = {}) =>
	mount(
		<ModalProvider emitter={mockDassanaEmitter}>
			<Modal
				emitter={mockDassanaEmitter}
				modalConfig={{ content: mockModalContent, options }}
				unsetModal={unsetModalSpy}
			/>
		</ModalProvider>,
		mountOptions
	)

beforeEach(() => {
	wrapper = getWrapper()
})

afterEach(() => {
	wrapper.unmount()
	jest.clearAllMocks()
})

it('renders', () => {
	expect(wrapper).toHaveLength(1)
})

it('should render its content', () => {
	expect(wrapper.text()).toContain(mockMessage)
})

it('should not call unsetModal if disableKeyboardShortcut is set to true', () => {
	wrapper.unmount()
	wrapper = getWrapper({ disableKeyboardShortcut: true })

	act(() => {
		dispatchEvent(
			new KeyboardEvent('keydown', {
				code: 'Escape',
				key: 'Escape'
			})
		)
	})

	expect(unsetModalSpy).not.toHaveBeenCalled()
})

it('should call the onClose function if one is provided', () => {
	const mockOnClose = jest.fn()

	wrapper = getWrapper({
		onClose: mockOnClose
	})

	act(() => {
		dispatchEvent(
			new KeyboardEvent('keydown', {
				code: 'Escape',
				key: 'Escape'
			})
		)
	})

	expect(mockOnClose).toHaveBeenCalled()
})

it('should close the modal if Esc is pressed', () => {
	act(() => {
		dispatchEvent(
			new KeyboardEvent('keydown', {
				code: 'Escape',
				key: 'Escape'
			})
		)
	})

	expect(unsetModalSpy).toHaveBeenCalled()
})

it('should close modal if the close button is clicked', () => {
	wrapper.find(IconButton).props().onClick!()

	expect(unsetModalSpy).toHaveBeenCalled()
})

it('should have an opaque background if overlay is set to true in options', () => {
	const div = document.createElement('div')
	div.setAttribute('id', 'container')
	document.body.appendChild(div)

	wrapper = getWrapper(
		{ overlay: true },
		{ attachTo: document.getElementById('container') }
	)

	const style = window.getComputedStyle(wrapper.find(Modal).getDOMNode())

	expect(style.opacity).not.toEqual(1)
})
