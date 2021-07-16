import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { TableIconLabelType } from './types'
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
	label?: string
	labelType?: TableIconLabelType
}
export const IconCell: FC<IconCellProps> = ({
	label,
	labelType,
	iconProps
}: IconCellProps) => {
	const classes = useStyles()

	switch (labelType) {
		case 'inline':
			return (
				<div className={classes.iconWrapper}>
					<Icon {...iconProps} />
					<span className={classes.label}>{label}</span>
				</div>
			)

		case 'tooltip':
			return (
				<Tooltip
					title={label}
					tooltipTriggerClasses={[classes.tooltipTrigger]}
				>
					<Icon {...iconProps} />
				</Tooltip>
			)
	}

	return (
		<div className={classes.iconWrapper}>
			<Icon {...iconProps} />
		</div>
	)
}
