import { createUseStyles } from 'react-jss'
import { defaultIconHeight } from './utils'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { Icon, IconProps } from '../Icon'
import React, { FC } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	count: { borderBottom: '1px solid', marginLeft: spacing.s },
	icon: {
		'&:not(:last-child)': {
			marginRight: spacing.s
		}
	},
	iconInTooltip: {
		marginBottom: spacing.s,
		marginRight: spacing.s
	},
	tooltip: {
		'&.ant-tooltip': {
			'& > .ant-tooltip-content > .ant-tooltip-inner': {
				padding: `${spacing.s}px 0 0 ${spacing.s}px`
			},
			maxWidth: 250 - spacing.s
		}
	}
})

interface Props {
	iconPropsArr: IconProps[]
	height?: number
	truncateLength?: number
}

export const MultipleIcons: FC<Props> = ({
	iconPropsArr = [],
	height = defaultIconHeight,
	truncateLength = 2
}: Props) => {
	const classes = useStyles()

	interface RenderIcons {
		sliceStartIndex: number
		sliceEndIndex?: number
		isInsideTooltip?: boolean
	}
	const renderIcons = ({
		sliceStartIndex,
		sliceEndIndex,
		isInsideTooltip
	}: RenderIcons) =>
		iconPropsArr
			.slice(sliceStartIndex, sliceEndIndex)
			.map((iconProps, i) => {
				return (
					<Icon
						{...iconProps}
						classes={[
							classes.icon,
							isInsideTooltip ? classes.iconInTooltip : ''
						]}
						height={height}
						key={i}
					/>
				)
			})

	return (
		<>
			{renderIcons({ sliceEndIndex: truncateLength, sliceStartIndex: 0 })}
			{truncateLength < iconPropsArr.length ? (
				<Tooltip
					classes={[classes.tooltip]}
					placement='bottom'
					renderWithoutDataTag
					title={renderIcons({
						isInsideTooltip: true,
						sliceStartIndex: truncateLength
					})}
				>
					<span className={classes.count}>
						+{iconPropsArr.length - truncateLength}
					</span>
				</Tooltip>
			) : (
				''
			)}
		</>
	)
}
