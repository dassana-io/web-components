import cn from 'classnames'
import { createUseStyles as createJssUseStyles } from 'react-jss'
import { ThemeType } from 'components/assets/styles'
import { Tooltip } from 'antd'
import React, { FC } from 'react'

const { light, dark } = ThemeType

const createUseStyles = ({ colors }: Pick<ColoredDotProps, 'colors'>) =>
	createJssUseStyles({
		coloredDot: {
			background: colors && colors[light] ? colors[light] : 'transparent',
			borderRadius: '50%',
			display: 'block',
			height: 10,
			width: 10
		},
		// eslint-disable-next-line sort-keys
		'@global': {
			[`.${dark}`]: {
				'& $coloredDot': {
					background:
						colors && colors[dark] ? colors[dark] : 'transparent'
				}
			}
		}
	})

export interface ColoredDotProps {
	classes?: string[]
	colors?: {
		[ThemeType.light]: string
		[ThemeType.dark]: string
	}
	tooltipText?: string
}

export const ColoredDot: FC<ColoredDotProps> = ({
	classes = [],
	colors,
	tooltipText = ''
}: ColoredDotProps) => {
	const componentClasses = createUseStyles({
		colors
	})()

	const dotClasss = cn(componentClasses.coloredDot, classes)

	const showTooltip = colors && tooltipText

	return showTooltip ? (
		<Tooltip title={tooltipText}>
			<span className={dotClasss}></span>
		</Tooltip>
	) : (
		<span className={dotClasss}></span>
	)
}
