import { createUseStyles } from 'react-jss'
import { Tooltip } from 'components/Tooltip'
import { useTableContext } from './TableContext'
import React, { FC, SyntheticEvent, useState } from 'react'

const useStyles = createUseStyles({
	container: { display: 'grid', placeItems: 'stretch' },
	text: {
		display: 'block',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	wrapper: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	}
})

interface CellWithTooltipProps {
	showTooltip?: boolean
	text: string
}

export const CellWithTooltip: FC<CellWithTooltipProps> = ({
	showTooltip = true,
	text
}: CellWithTooltipProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)

	const { isMobile } = useTableContext()

	const classes = useStyles()

	return isMobile || !showTooltip ? (
		<>{text}</>
	) : (
		<div className={classes.container}>
			<div
				className={classes.wrapper}
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
			</div>
		</div>
	)
}
