import { CollapseIndicator } from './CollapseIndicator'
import { createUseStyles } from 'react-jss'
import { Panel } from './types'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { flexSpaceBetween, font, fontWeight, spacing } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	header: {
		...font.body,
		...flexSpaceBetween,
		alignItems: 'center',
		cursor: 'pointer',
		fontWeight: fontWeight.light,
		padding: `${spacing['s+']}px ${spacing.m}px`
	},
	title: { color: themes[light].primary, marginLeft: spacing['s+'] },
	titleWrapper: {
		display: 'flex'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $title': { color: themes[dark].state.hover }
		}
	}
})

interface Props extends Pick<Panel, 'title' | 'headerRightContent'> {
	onHeaderClick?: () => void
	isExpanded: boolean
}

export const Header: FC<Props> = ({
	headerRightContent,
	onHeaderClick,
	isExpanded,
	title
}: Props) => {
	const classes = useStyles()
	return (
		<div className={classes.header} onClick={onHeaderClick}>
			<div className={classes.titleWrapper}>
				<CollapseIndicator isCollapsed={!isExpanded} />
				<span className={classes.title}>{title}</span>
			</div>
			{headerRightContent && headerRightContent}
		</div>
	)
}
