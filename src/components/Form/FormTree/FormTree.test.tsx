import { Controller } from 'react-hook-form'
import FieldLabel from '../FieldLabel'
import React from 'react'
import treeData from 'components/Tree/fixtures/0_sample_data'
import FieldContext, { FieldContextProps } from '../FieldContext'
import FormTree, { FormTreeProps } from '.'
import { mount, ReactWrapper } from 'enzyme'
import { Tree, TreeId } from 'components/Tree'

/* Helper functions */
interface MountWrapperArgsType {
	name: string
	defaultChecked?: TreeId[]
}

const mountWrapper = ({ name, defaultChecked }: MountWrapperArgsType) => {
	const defaultValue: FieldContextProps = {
		loading: true,
		onSubmit: mockOnSubmit
	}
	const formTreeProps: FormTreeProps = {
		name,
		treeData
	}

	if (defaultChecked) formTreeProps.defaultChecked = defaultChecked

	wrapper = mount(
		<FieldContext.Provider value={defaultValue}>
			<FormTree {...formTreeProps} treeData={treeData} />
		</FieldContext.Provider>
	)
}
/* --------------------------------------- */

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({})
	})
}))

let wrapper: ReactWrapper<FormTreeProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	mountWrapper({ name: 'foo' })
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormTree', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	// it('correctly passes a default value from initial values if it exists', () => {
	// 	expect(wrapper.find(Controller).props().defaultValue).toMatchObject([0])
	// })

	// it('correctly passes default checked as default value if initial values do not exist', () => {
	// 	mountWrapper({ defaultChecked: [1], name: 'foo' })
	// 	expect(wrapper.find(Controller).props().defaultValue).toMatchObject([1])
	// })

	// it('correctly passes an empty array as default value if initial values and default checked do not exist', () => {
	// 	mountWrapper({ name: 'foo' })
	// 	expect(wrapper.find(Controller).props().defaultValue).toMatchObject([])
	// })

	// it('correctly passes default values if both default checked and initial values exist', () => {
	// 	mountWrapper({
	// 		defaultChecked: [1],
	// 		name: 'foo'
	// 	})
	// 	expect(wrapper.find(Controller).props().defaultValue).toMatchObject([0])
	// })

	it('should render a Tree component', () => {
		const test = {
			onChange: jest.fn()
		} as jest.Mocked<any>

		const tree = wrapper.find(Controller).invoke('render')!(test)

		expect(tree.type).toBe(Tree)
	})

	it('renders a label if one is passed in', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormTree label='Field Label' name='foo' treeData={treeData} />
			</FieldContext.Provider>
		)

		expect(wrapper.find(FieldLabel)).toHaveLength(1)
	})
})
