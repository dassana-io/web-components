import { action } from '@storybook/addon-actions'
import { createUseStyles } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC, ReactNode } from 'react'
import { TabConfig, Tabs, TabsProps } from './index'
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

const Template: Story<TabsProps> = args => <Tabs {...args} />

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
		render: () => <TabPane>Banana mochi muffin</TabPane>
	},
	{
		key: 'lorem3',
		label: 'Lorem 3',
		render: () => <TabPane>Strawberry mochi cheesecake</TabPane>,
		splitRight: true
	},
	{
		key: 'lorem1',
		label: 'Lorem 1',
		render: () => <TabPane>Watermelon pound cake</TabPane>,
		splitRight: true
	},
	{
		key: 'ipsum',
		label: 'Ipsum',
		render: () => <TabPane>Pineapple upside down cake</TabPane>
	}
]

export const Default = Template.bind({})
Default.args = { tabConfig }
