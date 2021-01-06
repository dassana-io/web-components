import { useWizardCmp } from '../utils'
import { act, renderHook } from '@testing-library/react-hooks'

const initializeWizard = (
	totalSteps = 3,
	defaultStep?: number,
	enableAllSteps = false
) => renderHook(() => useWizardCmp(totalSteps, defaultStep, enableAllSteps))

const nextStep = (result: any) => {
	act(() => {
		result.current.nextStep()
	})
}

describe('useWizardCmp', () => {
	it('should have default active step to 1 when initialized', () => {
		const { result } = initializeWizard()

		expect(result.current.step).toBe(1)
	})

	it('should have the max number of activated steps if all steps are enabled', () => {
		const { result } = initializeWizard(3, 1, true)

		expect(result.current.maxActiveStep).toBe(3)
	})

	describe('prevStep', () => {
		it('should go back to the previous step when invoked', () => {
			const { result } = initializeWizard(2, 2)

			act(() => {
				result.current.prevStep()
			})

			expect(result.current.step).toBe(1)
		})

		it('should throw an error if invoked on the first step', () => {
			const { result } = initializeWizard()

			const prevStep = () => {
				act(() => {
					result.current.prevStep()
				})
			}

			expect(prevStep).toThrowError('Invalid use of prevStep')
		})
	})

	describe('nextStep', () => {
		it('should advance to the next step when invoked', () => {
			const { result } = initializeWizard()

			nextStep(result)

			expect(result.current.step).toBe(2)
		})

		it('should throw an error if nextStep is invoked on the final step', () => {
			const { result } = initializeWizard(2, 2)

			const advanceStep = () => {
				act(() => {
					result.current.nextStep()
				})
			}

			expect(advanceStep).toThrowError('Invalid use of nextStep')
		})

		it('should correctly update maxActiveStep', () => {
			const { result } = initializeWizard(3, 2)

			expect(result.current.step).toBe(2)
			expect(result.current.maxActiveStep).toBe(2)

			act(() => {
				result.current.prevStep()
			})

			expect(result.current.step).toBe(1)
			expect(result.current.maxActiveStep).toBe(2)

			nextStep(result)

			expect(result.current.step).toBe(2)
			expect(result.current.maxActiveStep).toBe(2)

			nextStep(result)

			expect(result.current.step).toBe(3)
			expect(result.current.maxActiveStep).toBe(3)
		})
	})

	describe('resetWizard', () => {
		it('should reset the stepper to the defaultActiveStep', () => {
			const { result } = initializeWizard(3, 2)

			nextStep(result)

			expect(result.current.step).toBe(3)

			act(() => {
				result.current.resetWizard()
			})

			expect(result.current.maxActiveStep).toBe(2)
			expect(result.current.step).toBe(2)
		})

		it('should not reset maxActiveStep if enableAllSteps is passed as true', () => {
			const { result } = initializeWizard(3, 2, true)

			expect(result.current.maxActiveStep).toBe(3)

			nextStep(result)

			expect(result.current.step).toBe(3)

			act(() => {
				result.current.resetWizard()
			})

			expect(result.current.maxActiveStep).toBe(3)
			expect(result.current.step).toBe(2)
		})
	})

	describe('goToStep', () => {
		it('should set the active step to the step that is passed in', () => {
			const { result } = initializeWizard(3)

			nextStep(result)
			nextStep(result)

			expect(result.current.step).toBe(3)

			act(() => {
				result.current.goToStep(2)
			})

			expect(result.current.step).toBe(2)
		})

		it('should throw an error if the step has never been visited', () => {
			const { result } = initializeWizard(3)

			nextStep(result)

			expect(result.current.step).toBe(2)

			const advanceStep = () => {
				act(() => {
					result.current.goToStep(3)
				})
			}

			expect(advanceStep).toThrowError(
				'Step must be less than or equal to maxActiveStep'
			)
		})
	})

	describe('storeData', () => {
		it('should provide a data store that persists until the wizard is unmounted', () => {
			const { result } = initializeWizard()

			const mockData = { foo: 'bar' }

			act(() => {
				result.current.storeData(mockData)
			})

			expect(result.current.data).toMatchObject(mockData)
		})
	})
})
