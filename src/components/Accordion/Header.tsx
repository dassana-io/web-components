import { CollapseIndicator } from './CollapseIndicator'
import { createUseStyles } from 'react-jss'
import { generateHeaderStyles } from './utils'
import { Panel } from './index'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType
const { spacing } = styleguide

const useStyles = createUseStyles({
	header: generateHeaderStyles(),
	title: { color: themes[light].primary, marginLeft: spacing['s+'] },
	titleWrapper: {
		display: 'flex',
		padding: spacing['s+'],
		paddingLeft: 0
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
