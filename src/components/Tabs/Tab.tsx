import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedActiveTabStyles } from './utils'
import React, { FC } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'
import { TabConfig, TabsProps } from '.'

const { dark, light } = ThemeType

const {
	colors: { blacks },
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	activeTab: {},
	tab: {
		'&$activeTab': {
			...generateThemedActiveTabStyles(light)
		},
		...font.body,
		borderBottom: '1px solid transparent',
		color: blacks['lighten-50'],
		cursor: 'pointer',
		display: 'inline-block',
		fontWeight: fontWeight.regular,
		listStyle: 'none',
		margin: { left: spacing.m, right: spacing.m },
		padding: { bottom: spacing.m, top: spacing.m },
		textAlign: 'center'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $activeTab': generateThemedActiveTabStyles(dark)
		}
	}
})

interface TabProps
	extends Pick<TabsProps, 'activeTabClasses' | 'tabClasses'>,
		Pick<TabConfig, 'label'> {
	isActiveTab: boolean
	tabIndex: number
	onClickTab: (tabIndex: number) => void
}

const Tab: FC<TabProps> = ({
	activeTabClasses = [],
	isActiveTab,
	label,
	onClickTab,
	tabClasses = [],
	tabIndex
}: TabProps) => {
	const classes = useStyles()

	const tabCmpClasses = cn(
		{
			[classes.tab]: true,
			[classes.activeTab]: isActiveTab,
			[cn(activeTabClasses)]: isActiveTab
		},
		tabClasses
	)

	return (
		<li className={tabCmpClasses} onClick={() => onClickTab(tabIndex)}>
			{label}
		</li>
	)
}

export default Tab
