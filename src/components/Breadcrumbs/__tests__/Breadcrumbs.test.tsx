import { Link } from '../../Link'
import React from 'react'
import { BreadcrumbConfig, Breadcrumbs } from '../index'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper

const mockOnClick = jest.fn()

const mockBreadCrumbs: BreadcrumbConfig[] = [
	{
		label: 'foo',
		onClick: mockOnClick
	},
	{
		label: 'bar'
	}
]

beforeEach(() => {
	wrapper = shallow(<Breadcrumbs config={mockBreadCrumbs} />)
})

it('should render', () => {
	expect(wrapper).toHaveLength(1)
})

it('should render a link with an onClick if one is provided in the config', () => {
	const link = wrapper.find(Link)

	link.simulate('click')

	expect(mockOnClick).toHaveBeenCalled()
})
