import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { IconButton } from 'components/IconButton'
import { InfoTip } from 'components/InfoTip'
import partition from 'lodash/partition'
import Tab from './Tab'
import TabPane from './TabPane'
import {
	findDefaultActiveIndex,
	generateThemedTabsListStyles,
	TabParams
} from './utils'
import React, {
	type FC,
	type ReactNode,
	type RefObject,
	useCallback,
	useImperativeHandle,
	useState
} from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { flexSpaceBetween } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	tabsList: {
		...generateThemedTabsListStyles(light),
		...flexSpaceBetween,
		borderBottom: '1px solid',
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
	splitRight?: boolean
	tabItemClasses?: string[]
}

interface TabsLimitConfig {
	infoTipMsg?: ReactNode
	limit: number
}

export interface UseTabsMethods {
	activeIndex: number
	setTab: (tabIndex: number) => void
	tabConfig: TabConfig[]
}

export interface TabsProps {
	activeTabClasses?: string[]
	classes?: string[]
	/**
	 * Component to render in place of + icon for adding new tabs
	 */
	customAddTabComponent?: ReactNode
	defaultActiveIndex?: number
	/**
	 * Only render content if tab pane is active. This should be set to true for content that renders
	 * based on ref heights of other elements on the page
	 * @default false
	 */
	forceRender?: boolean
	onAddNewTab?: (
		tabConfig: TabConfig[],
		tabsRef?: RefObject<UseTabsMethods>
	) => void
	onTabChange?: (data: TabConfig) => void
	tabConfig: TabConfig[]
	tabClasses?: string[]
	tabsLimitConfig?: TabsLimitConfig
	tabsListClasses?: string[]
	tabsRef?: RefObject<UseTabsMethods>
	transitionDuration?: number
}

export const Tabs: FC<TabsProps> = ({
	activeTabClasses = [],
	classes = [],
	customAddTabComponent,
	defaultActiveIndex = 0,
	forceRender = false,
	onAddNewTab,
	onTabChange,
	tabConfig,
	tabClasses = [],
	tabsLimitConfig,
	tabsListClasses = [],
	tabsRef,
	transitionDuration = 0.5
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

	useImperativeHandle(tabsRef, () => ({
		activeIndex,
		setTab: onClickTab,
		tabConfig
	}))

	const handleAddNewTab = useCallback(
		() => onAddNewTab && onAddNewTab(tabConfig, tabsRef),
		[onAddNewTab, tabConfig, tabsRef]
	)

	const renderAddTabAction = useCallback(
		() =>
			tabsLimitConfig && tabConfig.length >= tabsLimitConfig.limit ? (
				tabsLimitConfig.infoTipMsg ? (
					<InfoTip content={tabsLimitConfig.infoTipMsg} />
				) : (
					<></>
				)
			) : (
				customAddTabComponent ?? (
					<IconButton icon={faPlus} onClick={handleAddNewTab} />
				)
			),
		[
			customAddTabComponent,
			handleAddNewTab,
			tabConfig.length,
			tabsLimitConfig
		]
	)

	const renderTabItems = () => {
		const partitionedTabs = partition(
			tabConfig,
			({ splitRight }) => !splitRight
		)

		const [leftSideTabs, rightSideTabs] = partitionedTabs.map(
			(partitionedTab, i) =>
				partitionedTab.map(
					({ key, label, tabItemClasses = [] }: TabConfig, j) => {
						const leftSideLength = partitionedTabs[0].length
						const currentTabItemIndex =
							i === 0 ? j : j + leftSideLength

						return (
							<Tab
								activeTabClasses={activeTabClasses}
								isActiveTab={
									currentTabItemIndex === activeIndex
								}
								key={key}
								label={label}
								onClickTab={onClickTab}
								tabClasses={[...tabClasses, ...tabItemClasses]}
								tabIndex={currentTabItemIndex}
							/>
						)
					}
				)
		)

		return (
			<>
				<div>
					{leftSideTabs}
					{(customAddTabComponent ?? onAddNewTab) &&
						renderAddTabAction()}
				</div>
				<div>{rightSideTabs}</div>
			</>
		)
	}

	const renderTabPanes = () =>
		tabConfig.map((tabConfigItem, i) => (
			<TabPane
				forceRender={forceRender}
				isActive={i === activeIndex}
				key={i}
				tabConfigItem={tabConfigItem}
				transitionDuration={transitionDuration}
			/>
		))

	if (
		!(tabConfig.length > 0 || onAddNewTab != null || customAddTabComponent)
	) {
		throw new Error('Tab config should have at least one item in the array')
	}

	return (
		<div className={cn(classes)}>
			<div className={tabsListCmpClasses}>{renderTabItems()}</div>
			{renderTabPanes()}
		</div>
	)
}

export { findDefaultActiveIndex, TabParams }
