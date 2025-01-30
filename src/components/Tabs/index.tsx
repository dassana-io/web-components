import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { IconButton } from 'components/IconButton'
import { InfoTip } from 'components/InfoTip'
import partition from 'lodash/partition'
import { ScrollableTabs } from './ScrollableTabs'
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

const { flexAlignCenter, flexSpaceBetween, spacing } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	defaultAddTabIcon: {
		paddingLeft: spacing.s,
		paddingRight: spacing.l
	},
	leftSideTabs: {
		minWidth: '1%'
	},
	pinnedTabs: {
		flexShrink: 0
	},
	rightSideTabs: {
		minWidth: 'fit-content'
	},
	tabsList: {
		...generateThemedTabsListStyles(light),
		...flexAlignCenter,
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
	onClose?: (tabIndex: number, onError: () => void) => void
	onCloseTooltipContent?: string
	onDelete?: (tabIndex: number) => void
	pending?: boolean
	pinned?: boolean
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
	disabled?: boolean
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
	disabled = false,
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

	const onClickTab = useCallback(
		(tabIndex: number) => {
			if (onTabChange) onTabChange(tabConfig[tabIndex])

			setActiveIndex(tabIndex)
		},
		[onTabChange, tabConfig]
	)

	useImperativeHandle(tabsRef, () => ({
		activeIndex,
		setTab: onClickTab,
		tabConfig
	}))

	const getTabs = useCallback(
		({
			onClose,
			onCloseTooltipContent,
			onDelete,
			key,
			label,
			tabItemClasses = []
		}: TabConfig) => {
			const currentTabIdx = tabConfig.findIndex(({ key: k }) => key === k)

			return (
				<Tab
					activeTabClasses={activeTabClasses}
					dataTag={key}
					disabled={disabled}
					isActiveTab={currentTabIdx === activeIndex}
					key={key}
					label={label}
					onClickTab={onClickTab}
					onClose={onClose}
					onCloseTooltipContent={onCloseTooltipContent}
					onDelete={onDelete}
					tabClasses={[...tabClasses, ...tabItemClasses]}
					tabIndex={currentTabIdx}
				/>
			)
		},
		[
			activeIndex,
			activeTabClasses,
			disabled,
			onClickTab,
			tabClasses,
			tabConfig
		]
	)

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
				(customAddTabComponent ?? (
					<IconButton
						classes={[tabsClasses.defaultAddTabIcon]}
						icon={faPlus}
						onClick={handleAddNewTab}
					/>
				))
			),
		[
			customAddTabComponent,
			handleAddNewTab,
			tabConfig.length,
			tabsClasses.defaultAddTabIcon,
			tabsLimitConfig
		]
	)

	const renderTabItems = () => {
		const [pinnedTabConfig, restTabConfig] = partition(
			tabConfig,
			({ pinned }) => pinned
		)

		const pinnedTabs = pinnedTabConfig.map(getTabs)

		const partitionedTabConfigs = partition(
			restTabConfig,
			({ splitRight }) => !splitRight
		)

		const [leftSideTabs, rightSideTabs] = partitionedTabConfigs.map(
			partitionedTabs => partitionedTabs.map(getTabs)
		)

		return (
			<>
				{pinnedTabs.length > 0 && (
					<div className={tabsClasses.pinnedTabs}>{pinnedTabs}</div>
				)}

				<div className={tabsClasses.leftSideTabs}>
					<ScrollableTabs tabs={leftSideTabs} />
				</div>
				{(customAddTabComponent ?? onAddNewTab) && renderAddTabAction()}

				<div className={tabsClasses.rightSideTabs}>{rightSideTabs}</div>
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
