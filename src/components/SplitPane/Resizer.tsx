import { createUseStyles } from 'react-jss'
import { SplitPaneType } from '.'
import { styleguide } from 'components/assets/styles'
import { useSplitPaneCtx } from './SplitPaneContext'
import React, { FC } from 'react'

const {
	colors: { blacks }
} = styleguide

const getCommonStyleProps = (type: SplitPaneType['type'], isHidden = false) => {
	const color = isHidden ? 'transparent' : blacks['lighten-10']

	return {
		borderBottom: type === 'row' ? 'none' : `1px solid ${color}`,
		borderRight: type === 'column' ? 'none' : `1px solid ${color}`
	}
}

const useStyles = createUseStyles({
	border: ({ type }: SplitPaneType) => getCommonStyleProps(type),
	hidden: ({ type }: SplitPaneType) => getCommonStyleProps(type, true),
	resizer: ({ type }: SplitPaneType) => ({
		'&:hover': {
			'& $hidden': { borderColor: blacks['lighten-10'] }
		},
		cursor: type === 'row' ? 'col-resize' : 'row-resize',
		display: 'flex',
		flexDirection: type
	})
})

const Resizer: FC = () => {
	const { onMouseDown, type } = useSplitPaneCtx()

	const classes = useStyles({ type })

	return (
		<div className={classes.resizer} onMouseDown={onMouseDown}>
			<div className={classes.hidden} />
			<div className={classes.border} />
			<div className={classes.hidden} />
		</div>
	)
}

export default Resizer
