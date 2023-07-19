import * as hooks from '../utils'
import Modal from '../Modal'
import { mount } from 'enzyme'
import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { ModalProvider, type Props as ModalProviderProps, useModal } from '../index'

const setModalConfigSpy = jest.fn()
const unsetModalSpy = jest.fn()
const mockModalContent = <div>Hello World</div>

// @ts-expect-error
jest.spyOn(hooks, 'useModalCmp').mockImplementation(() => ({
	modalConfig: { content: mockModalContent },
	setModalConfig: setModalConfigSpy,
	unsetModal: unsetModalSpy
}))

jest.mock('react-dom', () => {
	const original = jest.requireActual('react-dom')

	return {
		...original,
		createPortal: (node: any) => node
	}
})

const mockDassanaEmitter = {
	emit: jest.fn(),
	emitNotificationEvent: jest.fn(),
	off: jest.fn(),
	on: jest.fn()
} as jest.Mocked<any>

let wrapper: React.FC<ModalProviderProps>

afterEach(() => {
	jest.clearAllMocks()
})

it('should provide an setModal function via context', () => {
	wrapper = ({ children }: ModalProviderProps) => (
		<ModalProvider emitter={mockDassanaEmitter}>{children}</ModalProvider>
	)

	const { result } = renderHook(() => useModal(), { wrapper })

	act(() => {
		result.current.setModalConfig({ content: mockModalContent })
	})

	expect(setModalConfigSpy).toHaveBeenCalledWith({
		content: mockModalContent
	})
})

it('should provide an unsetModal function via context', () => {
	wrapper = ({ children }: ModalProviderProps) => (
		<ModalProvider emitter={mockDassanaEmitter}>{children}</ModalProvider>
	)

	const { result } = renderHook(() => useModal(), { wrapper })

	act(() => {
		result.current.unsetModal()
	})

	expect(unsetModalSpy).toHaveBeenCalled()
})

it('should render a Modal with the modal content in context', () => {
	const component = mount(
		<ModalProvider emitter={mockDassanaEmitter}>
			<div>Test</div>
		</ModalProvider>
	)

	const modal = component.find(Modal)

	expect(modal).toHaveLength(1)
	expect(modal.props().modalConfig.content).toEqual(mockModalContent)
})
