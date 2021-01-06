import { useWizardCmp } from './utils'
import React, { FC, ReactNode } from 'react'
import { useWizard, WizardCtx } from './WizardContext'

export interface Step {
	render: () => ReactNode
	title?: string
}

export interface WizardProps {
	defaultActiveStep?: number
	enableAllSteps?: boolean
	steps: Step[]
}

const Wizard: FC<WizardProps> = ({
	defaultActiveStep,
	enableAllSteps = false,
	steps
}: WizardProps) => {
	const { step, ...rest } = useWizardCmp(
		steps.length,
		defaultActiveStep,
		enableAllSteps
	)

	return (
		<WizardCtx.Provider value={{ step, ...rest }}>
			{/* Steps array is index-based — if step is 1, steps[0] returns the correct step */}
			{steps[step - 1].render()}
		</WizardCtx.Provider>
	)
}

export { useWizard, Wizard }
