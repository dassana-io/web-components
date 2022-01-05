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
		disabled: false,
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

const mockOnChange = jest.fn()
const mockChangeEvent = {
	field: {
		onChange: mockOnChange,
		value: true
	}
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormTreeProps>) =>
	wrapper.find(Controller).invoke('render')!(mockChangeEvent)

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

	it('should render a Tree component', () => {
		const tree = getRenderedCmp(wrapper)

		expect(tree.type).toBe(Tree)
	})

	it('renders a label if one is passed in', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					disabled: false,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormTree label='Field Label' name='foo' treeData={treeData} />
			</FieldContext.Provider>
		)

		expect(wrapper.find(FieldLabel)).toHaveLength(1)
	})

	it('should be disabled if the form is disabled', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					disabled: true,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormTree label='Field Label' name='foo' treeData={treeData} />
			</FieldContext.Provider>
		)

		const tree = getRenderedCmp(wrapper)

		expect(tree.props.disabled).toBe(true)
	})
})
