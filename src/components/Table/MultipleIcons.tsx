import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { useTableContext } from './TableContext'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const iconSpacing = spacing.s

const useStyles = createUseStyles({
	count: { borderBottom: '1px solid', marginLeft: iconSpacing },
	icon: {
		'&:not(:last-child)': {
			marginRight: iconSpacing
		}
	},
	iconInTooltip: {
		marginBottom: iconSpacing
	},
	tooltip: {
		'&.ant-tooltip': {
			'& > .ant-tooltip-content > .ant-tooltip-inner': {
				display: 'flex',
				flexWrap: 'wrap',
				padding: `${iconSpacing}px 0 0 ${iconSpacing}px`
			},
			width: ({ height, isMobile, truncatedIconsLength }) => {
				/* Since the width of icon is same as height, use height
        to calculate total width of the Tooltip inside which icons
        render. NOTE: This is optimized for icons with tooltips. */
				const totalWidth =
					height * truncatedIconsLength +
					iconSpacing * truncatedIconsLength +
					iconSpacing

				const defaultWidth = height * 6 + iconSpacing * 6 + iconSpacing
				const mobileWidth = height * 4 + iconSpacing * 4 + iconSpacing

				let width = defaultWidth

				if (totalWidth < mobileWidth) {
					width = totalWidth
				} else if (isMobile) {
					width = mobileWidth
				}

				return width
			}
		}
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'no-wrap'
	}
})

interface Props {
	height: number
	icons: ReactNode[]
	truncateLength?: number
}

export const MultipleIcons: FC<Props> = ({
	height,
	icons = [],
	truncateLength = 2
}: Props) => {
	const { isMobile } = useTableContext()

	const classes = useStyles({
		height,
		isMobile,
		truncatedIconsLength: icons.length - truncateLength
	})

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
		icons.slice(sliceStartIndex, sliceEndIndex).map((iconComp, i) => (
			<span
				className={cn({
					[classes.icon]: true,
					[classes.iconInTooltip]: isInsideTooltip
				})}
				key={i}
			>
				{iconComp}
			</span>
		))

	return (
		<div className={classes.wrapper}>
			{renderIcons({ sliceEndIndex: truncateLength, sliceStartIndex: 0 })}
			{truncateLength < icons.length && (
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
						+{icons.length - truncateLength}
					</span>
				</Tooltip>
			)}
		</div>
	)
}
