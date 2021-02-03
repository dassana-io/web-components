import { createContext, useContext } from 'react'

export interface WizardContextProps {
	data: Record<string, any>
	goToStep: (step: number) => void
	maxActiveStep: number
	nextStep: () => void
	prevStep: () => void
	resetData: () => void
	resetWizard: (step?: number) => void
	storeData: (data: Record<string, any>) => void
	step: number
}

const WizardCtx = createContext<WizardContextProps>({} as WizardContextProps)

const useWizard = (): WizardContextProps => useContext(WizardCtx)

export { WizardCtx, useWizard }
