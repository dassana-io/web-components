import { columnDefaultFixedWidth } from './utils'
import { createUseStyles } from 'react-jss'
import { Tooltip } from 'components/Tooltip'
import React, { FC, SyntheticEvent, useState } from 'react'

const useStyles = createUseStyles({
	text: {
		display: 'block',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		width: ({ width }) => width
	}
})

interface CellWithTooltipProps {
	text: string
	width?: number
}

export const CellWithTooltip: FC<CellWithTooltipProps> = ({
	text,
	width = columnDefaultFixedWidth
}: CellWithTooltipProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)

	const classes = useStyles({ width })

	return (
		<span
			className={classes.text}
			onMouseEnter={(e: SyntheticEvent) => {
				const el = e.currentTarget as HTMLElement

				el.scrollWidth > el.offsetWidth
					? setHasTooltip(true)
					: setHasTooltip(false)
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
	)
}
