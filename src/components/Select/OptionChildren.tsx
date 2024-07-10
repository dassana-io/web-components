import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles/styleguide'
import { Tooltip } from '../Tooltip'
import { tooltipStyles } from './utils'
import {
	Icon,
	type IconName,
	type IconProps,
	type SharedIconProps
} from '../Icon'
import React, {
	type FC,
	type ReactNode,
	type SyntheticEvent,
	useState
} from 'react'
import {
	type SelectOption,
	type SelectOptionsConfig,
	type SelectProps
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
	Pick<SelectProps, 'optionsConfig'> & {
		children?: ReactNode
		iconDefaultSrc?: string
	}

export const OptionChildren: FC<OptionChildrenProps> = ({
	children,
	iconDefaultSrc,
	iconKey,
	iconUrl,
	optionsConfig = {},
	text
}: OptionChildrenProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)
	const classes = useOptionChildrenStyles()
	const { style = {} } = optionsConfig

	const commonIconProps: SharedIconProps = {
		height: 15
	}

	const renderIconWithProps = (props: IconProps) => (
		<span className={classes.icon}>
			<Icon {...commonIconProps} {...props} />
		</span>
	)

	const renderIcon = (
		iconKey: IconName | string,
		optionsConfig: SelectOptionsConfig
	): JSX.Element => {
		const { iconMap } = optionsConfig

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

	const renderIconWithUrl = (iconUrl: string) =>
		renderIconWithProps({ icon: iconUrl, iconDefaultSrc })

	return (
		<div className={classes.option} style={style}>
			{children && children}
			{iconUrl && renderIconWithUrl(iconUrl)}
			{iconKey && renderIcon(iconKey, optionsConfig)}
			<span
				className={classes.optionText}
				onMouseEnter={(e: SyntheticEvent) => {
					const el = e.currentTarget as HTMLElement

					setHasTooltip(el.scrollWidth > el.offsetWidth)
				}}
			>
				{hasTooltip ? (
					<Tooltip
						classes={[classes.tooltip]}
						placement='bottomLeft'
						title={text}
					>
						{text}
					</Tooltip>
				) : (
					text
				)}
			</span>
		</div>
	)
}
