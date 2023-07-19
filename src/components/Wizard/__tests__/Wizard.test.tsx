import * as hooks from '../utils'
import React from 'react'
import { WizardCtx } from '../WizardContext'
import { act, renderHook } from '@testing-library/react-hooks'
import { mount, type ReactWrapper } from 'enzyme'
import { type Step, useWizard, Wizard } from '../index'

let wrapper: ReactWrapper

const nextStepSpy = jest.fn()

// @ts-expect-error
jest.spyOn(hooks, 'useWizardCmp').mockImplementation(() => ({
	goToStep: jest.fn(),
	nextStep: nextStepSpy,
	step: 1
}))

const mockSteps: Step[] = [
	{
		render: () => <div>Step 1</div>,
		title: 'Step 1'
	},
	{
		render: () => <div>Step 2</div>,
		title: 'Step 2'
	}
]

beforeEach(() => {
	wrapper = mount(<Wizard steps={mockSteps} />)
})

afterEach(() => {
	jest.clearAllMocks()
})

it('renders', () => {
	expect(wrapper).toHaveLength(1)
})

it('should render the correct component in the steps config', () => {
	expect(wrapper.text()).toContain('Step 1')
})

it('should provide a nextStep function via context', () => {
	// @ts-expect-error
	const wrapper = ({ children }) => (
		<WizardCtx.Provider value={hooks.useWizardCmp(3, 1)}>
			{children}
		</WizardCtx.Provider>
	)

	const { result } = renderHook(() => useWizard(), {
		wrapper
	})

	act(() => {
		result.current.nextStep()
	})

	expect(nextStepSpy).toHaveBeenCalled()
})
