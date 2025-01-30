import { action } from '@storybook/addon-actions'
import { createUseStyles } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC, type ReactNode } from 'react'
import { type TabConfig, Tabs, type TabsProps } from './index'
import { themedStyles, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	tabPane: {
		color: themedStyles[light].base.color,
		textAlign: 'center'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $tabPane': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

export default {
	argTypes: {
		onTabChange: { defaultValue: action('onTabChange') },
		tabConfig: { control: { disable: true } }
	},
	component: Tabs,
	parameters: {
		storyshots: { disable: true }
	},
	title: 'Tabs'
} as Meta

const Template: StoryFn<TabsProps> = args => <Tabs {...args} />

interface TabPaneProps {
	children: ReactNode
}

const TabPane: FC<TabPaneProps> = ({ children }: TabPaneProps) => {
	const classes = useStyles()

	return <div className={classes.tabPane}>{children}</div>
}

const tabConfig: TabConfig[] = [
	{
		key: 'lorem',
		label: 'Lorem',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin</TabPane>
	},

	{
		key: 'lorem1',
		label: 'Lorem1',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 1</TabPane>
	},
	{
		key: 'lorem2',
		label: 'Lorem2',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 2</TabPane>
	},
	{
		key: 'lorem3',
		label: 'Lorem3',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 3</TabPane>
	},
	{
		key: 'lorem4',
		label: 'Lorem4',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 4</TabPane>
	},
	{
		key: 'lorem5',
		label: 'Lorem5',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 5</TabPane>
	},
	{
		key: 'lorem6',
		label: 'Lorem6',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 6</TabPane>
	},
	{
		key: 'lorem7',
		label: 'Lorem7',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 7</TabPane>
	},
	{
		key: 'lorem8',
		label: 'Lorem8',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 8</TabPane>
	},
	{
		key: 'lorem9',
		label: 'Lorem9',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 9</TabPane>
	},
	{
		key: 'lorem10',
		label: 'Lorem10',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Banana mochi muffin 10</TabPane>
	},

	{
		key: 'pin_me',
		label: 'Pin Me',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		pinned: true,
		render: () => <TabPane>Content of pinned tab</TabPane>
	},
	{
		key: 'pin_me2',
		label: 'Pin Me 2',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		pinned: true,
		render: () => <TabPane>Content of pinned tab 2</TabPane>
	},
	{
		key: 'pin_me3',
		label: 'Pin Me 3',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		pinned: true,
		render: () => <TabPane>Content of pinned tab 3</TabPane>
	},
	{
		key: 'pin_me4',
		label: 'Pin Me 4',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		pinned: true,
		render: () => <TabPane>Content of pinned tab 4</TabPane>
	},

	{
		key: 'lorem3_right',
		label: 'Lorem 3',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Strawberry mochi cheesecake</TabPane>,
		splitRight: true
	},
	{
		key: 'lorem1_right',
		label: 'Lorem 1',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Watermelon pound cake</TabPane>,
		splitRight: true
	},
	{
		key: 'ipsum_right',
		label: 'Ipsum',
		onClose: () => alert('closed'),
		onDelete: () => alert('deleted'),
		render: () => <TabPane>Pineapple upside down cake</TabPane>,
		splitRight: true
	}
]

export const Default = Template.bind({})
Default.args = { onAddNewTab: () => console.log('adding new tab'), tabConfig }
