import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { generateThemedIconBtnStyles } from './utils'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import React, { FC, SyntheticEvent } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { borderRadius, flexCenter, font, spacing } = styleguide
const { light, dark } = ThemeType

const useStyles = createUseStyles({
	hasBorder: {
		...flexCenter,
		border: '1px solid',
		borderRadius,
		height: spacing.xl,
		width: spacing.xl
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
			'& $iconButton': generateThemedIconBtnStyles(dark)
		}
	}
})

export enum IconSizes {
	'xs' = font.label.fontSize,
	'sm' = font.body.fontSize,
	'lg' = font.h2.fontSize
}

interface Props {
	classes?: string[]
	hasBorder?: boolean
	icon?: FontAwesomeIconProps['icon']
	onClick?: (e?: SyntheticEvent) => void
	size?: number
}

/* NOTE: This will be moved to web-components eventually */
export const IconButton: FC<Props> = ({
	classes = [],
	hasBorder = false,
	icon = faTimes,
	onClick,
	size
}: Props) => {
	const componentClasses = useStyles({ size })

	const iconBtnClasses = cn(
		{
			[componentClasses.iconButton]: true,
			[componentClasses.hasBorder]: hasBorder
		},
		classes
	)

	const optionalProps: Pick<Props, 'onClick'> = {}

	if (onClick) {
		optionalProps.onClick = onClick
	}

	return (
		<span className={iconBtnClasses}>
			<FontAwesomeIcon
				className={componentClasses.icon}
				icon={icon}
				{...optionalProps}
			/>
		</span>
	)
}
