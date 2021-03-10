import { Menu } from '../'
import { MenuContextProvider } from '../MenuContext'
import MenuItem from '../MenuItem'
import MenuItemGroup from '../MenuItemGroup'
import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

const mockMenuKey = 'bar'

beforeEach(() => {
	wrapper = mount(
		<MenuContextProvider
			value={{
				activeKey: 'bar',
				onClick: jest.fn()
			}}
		>
			<Menu.ItemGroup name='Foo'>
				<Menu.Item menuKey={mockMenuKey}>Bar</Menu.Item>
			</Menu.ItemGroup>
		</MenuContextProvider>
	)
})

it('renders', () => {
	expect(wrapper.find(MenuItemGroup)).toHaveLength(1)
})

it('renders children', () => {
	expect(wrapper.find(MenuItem)).toHaveLength(1)
})
