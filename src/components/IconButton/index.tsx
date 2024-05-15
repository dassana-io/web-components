import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'
import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { getDataTestAttributeProp } from 'components/utils'
import {
	FontAwesomeIcon,
	type FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import {
	generateThemedDisabledStyles,
	generateThemedHasBorderStyles,
	generateThemedIconBtnStyles,
	generateThemedPendingStyles,
	generateThemedPrimaryStyles
} from './utils'
import React, {
	type FC,
	type MouseEvent,
	type SyntheticEvent,
	useCallback,
	useMemo
} from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { borderRadius, flexCenter, font } = styleguide
const { light, dark } = ThemeType

const BORDER_BUTTON_DIMENSION_RATIO = 2
const CIRCLE_BUTTON_DIMENSION_RATIO = 2.5

export enum IconSizes {
	'xs' = font.label.fontSize,
	'sm' = font.body.fontSize,
	'lg' = font.h2.fontSize,
	'xl' = font.h1.fontSize
}

const getButtonDimensions = ({
	circle,
	size = IconSizes.sm
}: IconButtonProps) => {
	const ratio = circle
		? CIRCLE_BUTTON_DIMENSION_RATIO
		: BORDER_BUTTON_DIMENSION_RATIO

	return size * ratio
}

const useStyles = createUseStyles({
	circle: {
		'& $pending': {
			animation: 'rotate-border 2s linear infinite',
			borderRadius: '50%',
			height: props => getButtonDimensions(props),
			position: 'absolute',
			width: props => getButtonDimensions(props),
			...generateThemedPendingStyles(light)
		},
		borderRadius: '50%'
	},
	disabled: generateThemedDisabledStyles(light),
	hasBorder: {
		'&$primary': generateThemedPrimaryStyles(light),
		...flexCenter,
		...generateThemedHasBorderStyles(light),
		borderRadius: props => (props.circle ? '50%' : borderRadius),
		height: props => getButtonDimensions(props),
		position: 'relative',
		width: props => getButtonDimensions(props)
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
	pending: generateThemedPendingStyles(light),
	primary: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $circle': {
				'& $pending': generateThemedPendingStyles(dark)
			},
			'& $disabled': generateThemedDisabledStyles(dark),
			'& $hasBorder': {
				...generateThemedHasBorderStyles(dark),
				'&$primary': generateThemedPrimaryStyles(dark)
			},
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

export interface IconButtonProps {
	circle?: boolean
	classes?: string[]
	dataTag?: string
	disabled?: boolean
	hasBorder?: boolean
	icon?: FontAwesomeIconProps['icon']
	onClick: (e?: SyntheticEvent) => void
	pending?: boolean
	primary?: boolean
	size?: number
}

export const IconButton: FC<IconButtonProps> = ({
	circle = false,
	classes = [],
	dataTag,
	disabled = false,
	hasBorder = false,
	icon = faTimes,
	onClick,
	pending = false,
	primary,
	size
}: IconButtonProps) => {
	const isPendingNonCircleIcon = useMemo(
		() => pending && !circle,
		[circle, pending]
	)

	const componentClasses = useStyles({ circle, size })

	const iconBtnClasses = cn(
		{
			[componentClasses.circle]: circle,
			[componentClasses.disabled]: disabled || pending,
			[componentClasses.iconButton]: true,
			[componentClasses.hasBorder]: hasBorder || circle,
			[componentClasses.primary]: primary
		},
		classes
	)

	const onIconButtonClick = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation()

			!disabled && onClick()
		},
		[disabled, onClick]
	)

	return (
		<span
			className={iconBtnClasses}
			onClick={onIconButtonClick}
			{...getDataTestAttributeProp('icon-button', dataTag)}
		>
			{pending && circle && <span className={componentClasses.pending} />}
			<FontAwesomeIcon
				className={componentClasses.icon}
				icon={isPendingNonCircleIcon ? faCircleNotch : icon}
				spin={isPendingNonCircleIcon}
			/>
		</span>
	)
}
