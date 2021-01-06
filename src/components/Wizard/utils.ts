import { useCallback, useState } from 'react'

export const useWizardCmp = (
	totalSteps: number,
	defaultActiveStep = 1,
	enableAllSteps: boolean
) => {
	const [activeStep, setActiveStep] = useState(defaultActiveStep)
	const [maxActiveStep, setMaxActiveStep] = useState(
		enableAllSteps ? totalSteps : defaultActiveStep
	)
	const [data, setData] = useState({})

	const goToStep = useCallback(
		(step: number) => {
			if (step > maxActiveStep) {
				throw new Error(
					`Step must be less than or equal to maxActiveStep. Step: ${step}, MaxActiveStep: ${maxActiveStep}`
				)
			}

			setActiveStep(step)
		},
		[maxActiveStep]
	)

	const nextStep = useCallback(() => {
		const nextStep = activeStep + 1

		if (nextStep > totalSteps) {
			throw new Error(
				'Invalid use of nextStep. Current step is the final step'
			)
		}

		if (nextStep > maxActiveStep) {
			setMaxActiveStep(nextStep)
		}

		setActiveStep(nextStep)
	}, [activeStep, maxActiveStep, totalSteps])

	const prevStep = useCallback(() => {
		if (activeStep === 1) {
			throw new Error(
				'Invalid use of prevStep. Current step is the first step'
			)
		}

		setActiveStep(activeStep - 1)
	}, [activeStep])

	const resetData = useCallback(() => setData({}), [])

	const resetWizard = useCallback(
		(step: number = defaultActiveStep) => {
			resetData()
			setActiveStep(step)

			if (!enableAllSteps) setMaxActiveStep(step)
		},
		[defaultActiveStep, enableAllSteps, resetData]
	)

	const storeData = useCallback(
		(dataToStore: Record<string, any>) => {
			setData({ ...data, ...dataToStore })
		},
		[data]
	)

	return {
		data,
		goToStep,
		maxActiveStep,
		nextStep,
		prevStep,
		resetData,
		resetWizard,
		step: activeStep,
		storeData
	}
}
