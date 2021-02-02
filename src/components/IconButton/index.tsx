import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import {
	generateThemedCircleButtonStyles,
	generateThemedDisabledStyles,
	generateThemedIconBtnStyles,
	generateThemedPendingStyles
} from './utils'
import React, { FC, SyntheticEvent } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { flexCenter, font } = styleguide
const { light, dark } = ThemeType

const useStyles = createUseStyles({
	circle: {
		'& $pending': {
			animation: 'rotate-border 2s linear infinite',
			borderRadius: '50%',
			height: props => props.size * 2,
			position: 'absolute',
			width: props => props.size * 2,
			...generateThemedPendingStyles(light)
		},
		...flexCenter,
		...generateThemedCircleButtonStyles(light),
		borderRadius: '50%',
		height: props => props.size * 2,
		position: 'relative',
		width: props => props.size * 2
	},
	disabled: generateThemedDisabledStyles(light),
	icon: {
		fontSize: props => (props.size ? props.size : 'inherit')
	},
	iconButton: {
		...generateThemedIconBtnStyles(light),
		cursor: 'pointer',
		lineHeight: 0,
		transition: 'border-color 0.3s, color 0.3s'
	},
	pending: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $circle': {
				'& $pending': generateThemedPendingStyles(dark),
				...generateThemedCircleButtonStyles(dark)
			},
			'& $disabled': generateThemedDisabledStyles(dark),
			'& $iconButton': generateThemedIconBtnStyles(dark)
		},
		'@keyframes rotate-border': {
			from: {
				transform: 'rotate(0)'
			},
			to: {
				transform: 'rotate(360deg)'
			}
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
	icon?: FontAwesomeIconProps['icon']
	onClick: (e?: SyntheticEvent) => void
	pending?: boolean
	size?: number
}

export const IconButton: FC<IconButtonProps> = ({
	circle = false,
	classes = [],
	disabled = false,
	icon = faTimes,
	onClick,
	pending = false,
	size = IconSizes.sm
}: IconButtonProps) => {
	const componentClasses = useStyles({ circle, size })

	if (pending && !circle) {
		throw new Error('Only circle icon buttons can show a pending state')
	}

	const iconBtnClasses = cn(
		{
			[componentClasses.circle]: circle,
			[componentClasses.disabled]: disabled || pending,
			[componentClasses.iconButton]: true
		},
		classes
	)

	return (
		<span className={iconBtnClasses} onClick={onClick}>
			{pending && <span className={componentClasses.pending} />}
			<FontAwesomeIcon className={componentClasses.icon} icon={icon} />
		</span>
	)
}
