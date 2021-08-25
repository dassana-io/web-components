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
	undefinedLabel?: string
	wrapperClasses?: string[]
}

export const IconCell: FC<IconCellProps> = ({
	label = '',
	labelClasses = [],
	labelType,
	iconProps,
	wrapperClasses = []
}: IconCellProps) => {
	const classes = useStyles()

	const { undefined: undef, inline, tooltip } = IconCellLabelType

	const iconWrapperClasses = cn(
		{ [classes.iconWrapper]: true },
		wrapperClasses
	)

	const renderInline = () => (
		<div className={iconWrapperClasses}>
			<Icon {...iconProps} handleErrors={false} />
			<span className={cn({ [classes.label]: true }, labelClasses)}>
				{label}
			</span>
		</div>
	)

	const renderTooltip = (label: string) => (
		<Tooltip
			placement='top'
			title={label}
			tooltipTriggerClasses={[classes.tooltipTrigger, ...wrapperClasses]}
		>
			<Icon {...iconProps} />
		</Tooltip>
	)

	switch (labelType) {
		case inline:
			return renderInline()

		case tooltip:
			return renderTooltip(label)

		case undef:
			return label === undef ? renderTooltip(undef) : renderInline()
	}

	return (
		<div className={iconWrapperClasses}>
			<Icon {...iconProps} />
		</div>
	)
}
