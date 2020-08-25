import React from 'react'
import Skeleton from '../../Skeleton'
import FieldLabel, { FieldLabelProps } from './index'
import { mount, shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<FieldLabelProps>

const MOCK_LABEL = 'Field Label'

const baseMockProps = {
	label: MOCK_LABEL
}

beforeEach(() => {
	wrapper = shallow(<FieldLabel {...baseMockProps} />)
})

describe('Field Label', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly renders the label', () => {
		expect(wrapper.text()).toContain(MOCK_LABEL)
	})

	it('applies the correct class if required is passed as true', () => {
		const fieldLabel = mount(<FieldLabel {...baseMockProps} required />)

		expect(fieldLabel.getDOMNode().classList.toString()).toContain(
			'required'
		)
	})

	describe('loading', () => {
		it('renders a skeleton if loading prop is passed as true', () => {
			wrapper = shallow(<FieldLabel {...baseMockProps} loading />)

			expect(wrapper.find(Skeleton)).toHaveLength(1)
		})
	})
})