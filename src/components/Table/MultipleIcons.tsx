import cn from 'classnames'
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
			maxWidth: 140
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
							cn({
								[classes.icon]: true,
								[classes.iconInTooltip]: isInsideTooltip
							})
						]}
						height={height}
						key={i}
					/>
				)
			})

	return (
		<div className='table-cell-icon'>
			{renderIcons({ sliceEndIndex: truncateLength, sliceStartIndex: 0 })}
			{truncateLength < iconPropsArr.length && (
				<Tooltip
					classes={[classes.tooltip]}
					placement='bottom'
					popupContainerSelector={'.table-cell-icon'}
					renderWithoutDataTag
					title={renderIcons({
						isInsideTooltip: true,
						sliceStartIndex: truncateLength
					})}
					triggerMode='click'
				>
					<span
						className={classes.count}
						onClick={e =>
							// this is to prevent the entire row from being clicked
							e.stopPropagation()
						}
					>
						+{iconPropsArr.length - truncateLength}
					</span>
				</Tooltip>
			)}
		</div>
	)
}
