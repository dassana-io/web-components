import { Menu } from '../'
import { MenuContextProvider } from '../MenuContext'
import MenuItem from '../MenuItem'
import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

const mockMenuKey = 'foo'

const getWrapper = (
	partialValue = {
		activeKey: 'foo'
	}
) => (
	<MenuContextProvider value={{ ...partialValue, onClick: jest.fn() }}>
		<Menu.Item menuKey={mockMenuKey}>Foo</Menu.Item>
	</MenuContextProvider>
)

beforeEach(() => {
	wrapper = mount(getWrapper())
})

it('renders', () => {
	expect(wrapper.find(MenuItem)).toHaveLength(1)
})

it('sets active class if the activeKey matches its own key', () => {
	expect(wrapper.find('[className*="active"]')).toHaveLength(1)
})

it('does not set active class if the activeKey does not match its own key', () => {
	wrapper = mount(
		getWrapper({
			activeKey: 'bar'
		})
	)
	expect(wrapper.find('[className*="active"]')).toHaveLength(0)
})
