import { useWizardCmp } from './utils'
import React, { type FC, type ReactNode, type RefObject, useImperativeHandle } from 'react'
import { useWizard, type WizardContextProps, WizardCtx } from './WizardContext'

export interface Step {
	render: () => ReactNode
	title?: string
}

export interface WizardProps {
	defaultActiveStep?: number
	enableAllSteps?: boolean
	steps: Step[]
	wizardRef?: RefObject<WizardContextProps>
}

const Wizard: FC<WizardProps> = ({
	defaultActiveStep,
	enableAllSteps = false,
	steps,
	wizardRef
}: WizardProps) => {
	const wizard = useWizardCmp(steps.length, defaultActiveStep, enableAllSteps)

	const { step } = wizard

	useImperativeHandle(wizardRef, () => wizard)

	return (
		<WizardCtx.Provider value={wizard}>
			{/* Steps array is index-based — if step is 1, steps[0] returns the correct step */}
			{steps[step - 1].render()}
		</WizardCtx.Provider>
	)
}

export { useWizard, Wizard }
