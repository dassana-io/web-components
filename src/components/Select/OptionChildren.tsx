import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles/styleguide'
import { Tooltip } from '../Tooltip'
import { tooltipStyles } from './utils'
import { Icon, IconName, SharedIconProps } from '../Icon'
import React, { FC, ReactNode, SyntheticEvent, useState } from 'react'
import {
	SelectOption,
	SelectOptionsConfig,
	SelectProps
} from './SingleSelect/types'

const { flexAlignCenter } = styleguide

const useOptionChildrenStyles = createUseStyles({
	icon: {
		...flexAlignCenter,
		paddingRight: 7.5
	},
	option: {
		...flexAlignCenter,
		minWidth: 0
	},
	optionText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	tooltip: tooltipStyles
})

type OptionChildrenProps = Omit<SelectOption, 'value'> &
	Pick<SelectProps, 'optionsConfig'> & { children?: ReactNode }

export const OptionChildren: FC<OptionChildrenProps> = ({
	children,
	iconKey,
	optionsConfig = {},
	text
}: OptionChildrenProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)
	const classes = useOptionChildrenStyles()

	const renderIcon = (
		iconKey: IconName,
		optionsConfig: SelectOptionsConfig
	): JSX.Element => {
		const commonIconProps: SharedIconProps = {
			height: 15
		}

		const { iconMap } = optionsConfig

		return (
			<span className={classes.icon}>
				{iconMap ? (
					<Icon {...commonIconProps} icon={iconMap[iconKey]} />
				) : (
					<Icon {...commonIconProps} iconKey={iconKey} />
				)}
			</span>
		)
	}

	return (
		<div className={classes.option}>
			{children && children}
			{iconKey && renderIcon(iconKey, optionsConfig)}
			<span
				className={classes.optionText}
				onMouseEnter={(e: SyntheticEvent) => {
					const el = e.currentTarget as HTMLElement

					if (el.scrollWidth > el.offsetWidth) {
						setHasTooltip(true)
					} else {
						setHasTooltip(false)
					}
				}}
			>
				{hasTooltip ? (
					<Tooltip placement='bottomLeft' title={text}>
						{text}
					</Tooltip>
				) : (
					text
				)}
			</span>
		</div>
	)
}
