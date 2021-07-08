import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import React, { FC } from 'react'

const { font, spacing } = styleguide

const useStyles = createUseStyles({
	title: {
		...font.h1,
		paddingBottom: spacing.m
	}
})

interface TitleProps {
	classes?: string[]
	title: string
}

const Title: FC<TitleProps> = ({ classes = [], title }: TitleProps) => {
	const containerClasses = useStyles()

	return (
		<div className={cn({ [containerClasses.title]: true }, classes)}>
			{title}
		</div>
	)
}

export default Title
