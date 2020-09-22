import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import React from 'react'
import Tree from '../../Tree'
import treeData from '../../Tree/fixtures/0_sample_data'
import FormTree, { FormTreeProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({})
	})
}))

let wrapper: ReactWrapper<FormTreeProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				initialValues: { foo: 'bar' },
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormTree name='foo' treeData={treeData} />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormTree', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly passes a default value from initial values if it exists', () => {
		expect(wrapper.find(Controller).props().defaultValue).toEqual('bar')
	})

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
					initialValues: {},
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
