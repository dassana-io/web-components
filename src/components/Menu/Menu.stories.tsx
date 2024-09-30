import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { Menu, type MenuProps } from '.'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type Key, useState } from 'react'

export default {
	argTypes: {
		activeKey: { control: { disable: true } },
		children: { control: { disable: true } },
		onClick: { control: { disable: true } }
	},
	component: Menu,
	decorators: [SecondaryBgDecorator],
	title: 'Menu'
} as Meta

const Template: StoryFn<MenuProps> = args => {
	const [activeKey, setActiveKey] = useState<Key>('dolor')

	return (
		<div style={{ width: 200 }}>
			<Menu
				{...args}
				activeKey={activeKey}
				onClick={menuKey => setActiveKey(menuKey)}
			/>
		</div>
	)
}

export const Default = Template.bind({})
Default.args = {
	children: (
		<>
			<Menu.ItemGroup name='Lorem'>
				<Menu.Item menuKey='ipsum'>Ipsum</Menu.Item>
				<Menu.Item menuKey='dolor'>Dolor</Menu.Item>
			</Menu.ItemGroup>
			<Menu.ItemGroup name='Sit'>
				<Menu.Item menuKey='amet'>Amet</Menu.Item>
				<Menu.Item menuKey='consectetur'>Consectetur</Menu.Item>
			</Menu.ItemGroup>
		</>
	)
}
