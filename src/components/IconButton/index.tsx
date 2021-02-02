import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import {
	generateThemedDisabledStyles,
	generateThemedHasBorderStyles,
	generateThemedIconBtnStyles
} from './utils'
import React, { FC, SyntheticEvent } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { borderRadius, flexCenter, font } = styleguide
const { light, dark } = ThemeType

const useStyles = createUseStyles({
	disabled: generateThemedDisabledStyles(light),
	hasBorder: {
		...flexCenter,
		...generateThemedHasBorderStyles(light),
		borderRadius: props => (props.circle ? '50%' : borderRadius),
		height: props => props.size * 2,
		width: props => props.size * 2
	},
	icon: {
		fontSize: props => (props.size ? props.size : 'inherit')
	},
	iconButton: {
		...generateThemedIconBtnStyles(light),
		cursor: 'pointer',
		lineHeight: 0,
		transition: 'border-color 0.3s, color 0.3s'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $disabled': generateThemedDisabledStyles(dark),
			'& $hasBorder': generateThemedHasBorderStyles(dark),
			'& $iconButton': generateThemedIconBtnStyles(dark)
		}
	}
})

export enum IconSizes {
	'xs' = font.label.fontSize,
	'sm' = font.body.fontSize,
	'lg' = font.h2.fontSize,
	'xl' = font.h1.fontSize
}

export interface IconButtonProps {
	circle?: boolean
	classes?: string[]
	disabled?: boolean
	hasBorder?: boolean
	icon?: FontAwesomeIconProps['icon']
	onClick: (e?: SyntheticEvent) => void
	size?: number
}

export const IconButton: FC<IconButtonProps> = ({
	circle = false,
	classes = [],
	disabled = false,
	hasBorder = false,
	icon = faTimes,
	onClick,
	size
}: IconButtonProps) => {
	const componentClasses = useStyles({ circle, size })

	const iconBtnClasses = cn(
		{
			[componentClasses.disabled]: disabled,
			[componentClasses.iconButton]: true,
			[componentClasses.hasBorder]: hasBorder
		},
		classes
	)

	return (
		<span className={iconBtnClasses} onClick={onClick}>
			<FontAwesomeIcon className={componentClasses.icon} icon={icon} />
		</span>
	)
}
