import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedTabsListStyles } from './utils'
import Tab from './Tab'
import React, { FC, ReactNode, useState } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { font, spacing } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	tabPane: {
		...font.body,
		padding: `${spacing.m}px ${spacing.l}px`
	},
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
	label: string
	render: () => ReactNode
}

export interface TabsProps {
	classes?: string[]
	defaultActiveIndex?: number
	onTabChange?: (data: TabConfig) => void
	tabConfig: TabConfig[]
}

export const Tabs: FC<TabsProps> = ({
	classes = [],
	defaultActiveIndex = 0,
	onTabChange,
	tabConfig
}: TabsProps) => {
	/* Fallback to index 0 if tabConfig[defaultActiveIndex] doesn't exist */
	const [activeIndex, setActiveIndex] = useState(
		tabConfig[defaultActiveIndex] ? defaultActiveIndex : 0
	)
	const [tabSwitching, setTabSwitching] = useState(false)

	const tabsClasses = useStyles()

	const tabPaneClasses = cn(
		tabsClasses.tabPane,
		tabConfig[activeIndex].classes
	)

	const onClickTab = (tabIndex: number) => {
		if (onTabChange) onTabChange(tabConfig[tabIndex])

		setTabSwitching(true)
		setActiveIndex(tabIndex)

		/**
		 * Toggling the state of tabSwitching ensures a full unmount of the previously rendered component.
		 * If two tabs render the same component but with different props, React does not unmount the component
		 * which leads to unexpected behavior and potentially stale state for the newly rendered component.
		 * This can be also be solved by adding a "key" property to the tab panes rendered with
		 * tabConfig[activeIndex].render() but because there is no way to enforce this, this is a fallback.
		 */
		setTimeout(() => setTabSwitching(false))
	}

	const renderTabItems = () =>
		tabConfig.map(({ key, label }: TabConfig, i) => (
			<Tab
				isActiveTab={i === activeIndex}
				key={key}
				label={label}
				onClickTab={onClickTab}
				tabIndex={i}
			/>
		))

	if (!tabConfig.length) {
		throw new Error('Tab config should have at least one item in the array')
	}

	return (
		<div className={cn(classes)}>
			<div className={tabsClasses.tabsList}>{renderTabItems()}</div>
			<div className={tabPaneClasses}>
				{!tabSwitching && tabConfig[activeIndex].render()}
			</div>
		</div>
	)
}
