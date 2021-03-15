import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { useTableContext } from './TableContext'
import { Icon, IconProps } from '../Icon'
import React, { FC } from 'react'

const { spacing } = styleguide

export const defaultIconHeight = 25

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
			maxWidth: ({ isMobile }) => (isMobile ? 140 : 250 - spacing.s)
		}
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'no-wrap'
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
	const { isMobile } = useTableContext()

	const classes = useStyles({ isMobile })

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
		<div className={classes.wrapper}>
			{renderIcons({ sliceEndIndex: truncateLength, sliceStartIndex: 0 })}
			{truncateLength < iconPropsArr.length && (
				<Tooltip
					classes={[classes.tooltip]}
					placement='bottom'
					popupContainerSelector={`.${classes.wrapper}`}
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
