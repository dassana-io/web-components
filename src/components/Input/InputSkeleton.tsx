import { type BaseFormElementProps } from 'components/types'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import React, { type FC } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { borderRadius } = styleguide

const useInputStyles = createUseStyles({
	container: {
		width: ({ fullWidth, width }) =>
			width || (fullWidth ? '100%' : defaultFieldWidth)
	},
	inputSkeleton: {
		border: `1px solid ${themedStyles[light].loading.borderColor}`,
		borderRadius,
		padding: '6px 14px'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $inputSkeleton': {
				border: `1px solid ${themedStyles[dark].loading.borderColor}`
			}
		}
	}
})

interface InputSkeletonProps
	extends Pick<BaseFormElementProps<HTMLInputElement>, 'fullWidth'> {
	width?: string | number
}

const InputSkeleton: FC<InputSkeletonProps> = (props: InputSkeletonProps) => {
	const classes = useInputStyles(props)

	return (
		<div className={classes.container}>
			<div className={classes.inputSkeleton}>
				<Skeleton height={16} />
			</div>
		</div>
	)
}

export default InputSkeleton
