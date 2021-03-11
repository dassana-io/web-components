import { Menu } from '../'
import MenuItem from '../MenuItem'
import MenuItemGroup from '../MenuItemGroup'
import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

const mockOnClick = jest.fn()
const mockMenuKey = 'bar'

beforeEach(() => {
	wrapper = mount(
		<Menu activeKey={mockMenuKey} onClick={mockOnClick}>
			<Menu.ItemGroup name='Foo'>
				<Menu.Item menuKey={mockMenuKey}>Bar</Menu.Item>
			</Menu.ItemGroup>
		</Menu>
	)
})

it('renders', () => {
	expect(wrapper.find(Menu)).toHaveLength(1)
})

it('renders children', () => {
	expect(wrapper.find(MenuItemGroup)).toHaveLength(1)
})

it('calls onClick with correct arguments when a MenuItem is clicked', () => {
	const menuItem = wrapper.find(MenuItem)

	menuItem.simulate('click', mockMenuKey)

	expect(mockOnClick).toHaveBeenCalledWith(mockMenuKey)
})
