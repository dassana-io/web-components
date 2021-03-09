import { createUseStyles } from 'react-jss'
import { Tooltip } from 'components/Tooltip'
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
	text: string
}

export const CellWithTooltip: FC<CellWithTooltipProps> = ({
	text
}: CellWithTooltipProps) => {
	const [hasTooltip, setHasTooltip] = useState(false)

	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div
				className={classes.wrapper}
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
			</div>
		</div>
	)
}
