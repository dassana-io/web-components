import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles/styleguide'
import { Tooltip } from '../Tooltip'
import { tooltipStyles } from './utils'
import { Icon, IconName, IconProps, SharedIconProps } from '../Icon'
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

type OptionChildrenProps = Omit<SelectOption, 'disabled' | 'hidden' | 'value'> &
	Pick<SelectProps, 'optionsConfig'> & { children?: ReactNode }

export const OptionChildren: FC<OptionChildrenProps> = ({
	children,
	iconKey,
	optionsConfig = {},
	text
}: OptionChildrenProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)
	const classes = useOptionChildrenStyles()
	const { style = {} } = optionsConfig

	const renderIcon = (
		iconKey: IconName | string,
		optionsConfig: SelectOptionsConfig
	): JSX.Element => {
		const commonIconProps: SharedIconProps = {
			height: 15
		}

		const { iconMap } = optionsConfig

		const renderIconWithProps = (props: IconProps) => (
			<span className={classes.icon}>
				<Icon {...commonIconProps} {...props} />
			</span>
		)

		return iconMap ? (
			iconMap[iconKey] ? (
				renderIconWithProps({ icon: iconMap[iconKey] })
			) : (
				<></>
			)
		) : (
			renderIconWithProps({ iconKey: iconKey as IconName })
		)
	}

	return (
		<div className={classes.option} style={style}>
			{children && children}
			{iconKey && renderIcon(iconKey, optionsConfig)}
			<span
				className={classes.optionText}
				onMouseEnter={(e: SyntheticEvent) => {
					const el = e.currentTarget as HTMLElement

					setHasTooltip(el.scrollWidth > el.offsetWidth)
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
