import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { IconCellLabelType } from './types'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { Icon, IconProps } from '../Icon'
import React, { FC } from 'react'

const { flexAlignCenter, spacing } = styleguide

const useStyles = createUseStyles({
	iconWrapper: flexAlignCenter,
	label: { marginLeft: spacing.s },
	tooltipTrigger: {
		...flexAlignCenter,
		width: 'max-content'
	}
})

interface IconCellProps {
	iconProps: IconProps
	labelClasses?: string[]
	label?: string
	labelType?: IconCellLabelType
	wrapperClasses?: string[]
}
export const IconCell: FC<IconCellProps> = ({
	label,
	labelClasses = [],
	labelType,
	iconProps,
	wrapperClasses = []
}: IconCellProps) => {
	const classes = useStyles()

	const { inline, tooltip } = IconCellLabelType

	const iconWrapperClasses = cn(
		{ [classes.iconWrapper]: true },
		wrapperClasses
	)

	switch (labelType) {
		case inline:
			return (
				<div className={iconWrapperClasses}>
					<Icon {...iconProps} />
					<span
						className={cn({ [classes.label]: true }, labelClasses)}
					>
						{label}
					</span>
				</div>
			)

		case tooltip:
			return (
				<Tooltip
					title={label}
					tooltipTriggerClasses={[
						classes.tooltipTrigger,
						...wrapperClasses
					]}
				>
					<Icon {...iconProps} />
				</Tooltip>
			)
	}

	return (
		<div className={iconWrapperClasses}>
			<Icon {...iconProps} />
		</div>
	)
}
