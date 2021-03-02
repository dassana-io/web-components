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
		key: 'foo',
		label: 'Foo',
		render: () => <TabPane>Foo content text</TabPane>
	},
	{
		key: 'bar',
		label: 'Bar',
		render: () => <TabPane>Bar content text</TabPane>
	}
]

export const Default = Template.bind({})
Default.args = { tabConfig }
