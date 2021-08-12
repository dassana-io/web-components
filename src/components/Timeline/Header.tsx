import { createUseStyles } from 'react-jss'
import { generateHeaderStyles } from 'components/Accordion/utils'
import { getHeaderBorderRadius } from './utils'
import { TimelineConfig } from './types'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType
const {
	colors: { blacks, grays },
	spacing
} = styleguide

const useStyles = createUseStyles({
	header: {
		...generateHeaderStyles(),
		background: grays['lighten-40'],
		borderRadius: getHeaderBorderRadius,
		cursor: ({ expandWithHeader }) =>
			expandWithHeader ? 'pointer' : 'default'
	},
	title: {
		color: themes[light].primary,
		padding: spacing.s,
		paddingLeft: 0
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $header': {
				background: blacks['darken-10']
			},
			'& $title': { color: themes[dark].state.hover }
		}
	}
})

interface HeaderProps
	extends Pick<TimelineConfig, 'title' | 'headerRightContent'> {
	expandWithHeader?: boolean
	onClick?: () => void
}

export const Header: FC<HeaderProps> = ({
	expandWithHeader = false,
	headerRightContent,
	onClick,
	title
}: HeaderProps) => {
	const classes = useStyles({ expandWithHeader })

	return (
		<div className={classes.header} onClick={onClick}>
			<div className={classes.title}>{title}</div>
			{headerRightContent && headerRightContent}
		</div>
	)
}
