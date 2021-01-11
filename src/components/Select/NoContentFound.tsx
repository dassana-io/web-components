import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { FC, ReactNode } from 'react'

const { flexCenter } = styleguide

const useNoContentFoundStyles = createUseStyles({
	container: {
		...flexCenter
	}
})

interface Props {
	children?: ReactNode
}

export const NoContentFound: FC<Props> = ({
	children = <span>No Data</span>
}: Props) => {
	const classes = useNoContentFoundStyles()

	return <div className={classes.container}>{children}</div>
}
