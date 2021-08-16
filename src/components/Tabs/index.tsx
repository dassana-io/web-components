import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedTabsListStyles } from './utils'
import Tab from './Tab'
import TabPane from './TabPane'
import { ThemeType } from 'components/assets/styles'
import React, { FC, ReactNode, useState } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	tabsList: {
		...generateThemedTabsListStyles(light),
		alignItems: 'flex-end',
		borderBottom: '1px solid',
		display: 'flex',
		justifyContent: 'center',
		margin: 0,
		paddingLeft: 0
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $tabsList': generateThemedTabsListStyles(dark)
		}
	}
})

export interface TabConfig {
	/**
	 * Optional array of classes to customize the styles of Tab pane wrapper div
	 */
	classes?: string[]
	key: string
	label: string | ReactNode
	render: () => ReactNode
}

export interface TabsProps {
	activeTabClasses?: string[]
	classes?: string[]
	defaultActiveIndex?: number
	/**
	 * Only render content if tab pane is active. This should be set to true for content that renders
	 * based on ref heights of other elements on the page
	 * @default false
	 */
	forceRender?: boolean
	onTabChange?: (data: TabConfig) => void
	tabConfig: TabConfig[]
	tabClasses?: string[]
	tabsListClasses?: string[]
}

export const Tabs: FC<TabsProps> = ({
	activeTabClasses = [],
	classes = [],
	defaultActiveIndex = 0,
	forceRender = false,
	onTabChange,
	tabConfig,
	tabClasses = [],
	tabsListClasses = []
}: TabsProps) => {
	/* Fallback to index 0 if tabConfig[defaultActiveIndex] doesn't exist */
	const [activeIndex, setActiveIndex] = useState(
		tabConfig[defaultActiveIndex] ? defaultActiveIndex : 0
	)

	const tabsClasses = useStyles()
	const tabsListCmpClasses = cn(
		{
			[tabsClasses.tabsList]: true
		},
		tabsListClasses
	)

	const onClickTab = (tabIndex: number) => {
		if (onTabChange) onTabChange(tabConfig[tabIndex])

		setActiveIndex(tabIndex)
	}

	const renderTabItems = () =>
		tabConfig.map(({ key, label }: TabConfig, i) => (
			<Tab
				activeTabClasses={activeTabClasses}
				isActiveTab={i === activeIndex}
				key={key}
				label={label}
				onClickTab={onClickTab}
				tabClasses={tabClasses}
				tabIndex={i}
			/>
		))

	const renderTabPanes = () =>
		tabConfig.map((tabConfigItem, i) => (
			<TabPane
				forceRender={forceRender}
				isActive={i === activeIndex}
				key={i}
				tabConfigItem={tabConfigItem}
			/>
		))

	if (!tabConfig.length) {
		throw new Error('Tab config should have at least one item in the array')
	}

	return (
		<div className={cn(classes)}>
			<div className={tabsListCmpClasses}>{renderTabItems()}</div>
			{renderTabPanes()}
		</div>
	)
}
