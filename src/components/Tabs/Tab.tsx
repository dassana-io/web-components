import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedActiveTabStyles } from './utils'
import React, { FC } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const { fontWeight, spacing } = styleguide

const useStyles = createUseStyles({
	activeTab: {
		...generateThemedActiveTabStyles(light),
		borderBottom: '1px solid'
	},
	tab: {
		'&$activeTab': {
			fontWeight: fontWeight.regular
		},
		cursor: 'pointer',
		display: 'inline-block',
		fontWeight: fontWeight.light,
		listStyle: 'none',
		marginRight: spacing.m,
		padding: spacing.s
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $activeTab': generateThemedActiveTabStyles(dark)
		}
	}
})

interface TabProps {
	isActiveTab: boolean
	label: string
	tabIndex: number
	onClickTab: (tabIndex: number) => void
}

const Tab: FC<TabProps> = ({
	isActiveTab,
	label,
	onClickTab,
	tabIndex
}: TabProps) => {
	const classes = useStyles()

	const tabClasses = cn({
		[classes.tab]: true,
		[classes.activeTab]: isActiveTab
	})

	return (
		<li className={tabClasses} onClick={() => onClickTab(tabIndex)}>
			{label}
		</li>
	)
}

export default Tab
