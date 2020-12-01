import { createUseStyles } from 'react-jss'
import { Meta } from '@storybook/react/types-6-0'
import { IngestionStatusDot, Status } from '.'
import React, { FC } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

export default {
	component: IngestionStatusDot,
	title: 'IngestionStatusDot'
} as Meta

const { flexAlignCenter, font, spacing } = styleguide

const { light, dark } = ThemeType

const useStyles = createUseStyles({
	statusDot: {
		marginRight: spacing.m
	},
	wrapper: {
		...flexAlignCenter,
		...font.body,
		color: themedStyles[light].base.color,
		padding: `${spacing.s}px ${spacing.xl}px`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $wrapper': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

interface Props {
	status: Status
}

const DecoratedDot: FC<Props> = ({ status }: Props) => {
	const classes = useStyles()

	return (
		<div className={classes.wrapper}>
			<IngestionStatusDot classes={[classes.statusDot]} status={status} />
			{status}
		</div>
	)
}

const statuses = [
	Status.HASISSUES,
	Status.NEEDSCONFIG,
	Status.OK,
	Status.DISABLED
]

export const All = () => (
	<>
		{statuses.map((status: Status) => (
			<DecoratedDot key={status} status={status} />
		))}
	</>
)
