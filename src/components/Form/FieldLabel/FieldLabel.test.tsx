import React from 'react'
import { Skeleton } from 'components/Skeleton'
import FieldLabel, { type FieldLabelProps } from './index'
import { mount, shallow, type ShallowWrapper } from 'enzyme'

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

	it('applies the correct class if required is not passed as true', () => {
		const fieldLabel = mount(<FieldLabel {...baseMockProps} />)

		expect(
			fieldLabel.find('span').at(1).getDOMNode().classList.toString()
		).toContain('optional')
	})

	it('renders a field label that will span the width of its parent container if fullWidth is to true', () => {
		const fieldLabel = mount(<FieldLabel fullWidth {...baseMockProps} />)

		const style = window.getComputedStyle(fieldLabel.getDOMNode())

		expect(style.width).toEqual('100%')
	})

	describe('loading', () => {
		beforeEach(() => {
			wrapper = shallow(<FieldLabel {...baseMockProps} loading />)
		})

		it('renders a skeleton if loading prop is passed as true', () => {
			expect(wrapper.find(Skeleton)).toHaveLength(1)
		})

		it('passes a default skeleton width of 100', () => {
			expect(wrapper.find(Skeleton).props().width).toBe(100)
		})

		it('passes the correct width to Skeleton if one is provided', () => {
			wrapper = shallow(
				<FieldLabel {...baseMockProps} loading skeletonWidth={300} />
			)

			expect(wrapper.find(Skeleton).props().width).toBe(300)
		})
	})
})
