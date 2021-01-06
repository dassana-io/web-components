import React from 'react'
import { useModalCmp } from '../utils'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useModalCmp', () => {
	const mockCmp = <div>Hello World</div>

	it('should not have modal content when initialized', () => {
		const { result } = renderHook(() => useModalCmp())

		expect(result.current.modalConfig).toBeUndefined()
	})

	it('should have a setModalContent function that sets modal content', () => {
		const { result } = renderHook(() => useModalCmp())

		act(() => {
			result.current.setModalConfig({ content: mockCmp })
		})

		expect(result.current.modalConfig!.content).toBe(mockCmp)
	})

	it('should have an unsetModal function that clears the modal content', () => {
		const { result } = renderHook(() => useModalCmp())

		act(() => {
			result.current.setModalConfig({ content: mockCmp })
		})

		expect(result.current.modalConfig!.content).toBe(mockCmp)

		act(() => {
			result.current.unsetModal()
		})

		expect(result.current.modalConfig).toBeUndefined()
	})
})
