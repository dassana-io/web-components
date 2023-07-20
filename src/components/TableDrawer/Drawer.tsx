import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { IconButton, IconSizes } from '../IconButton'
import React, { type FC, type ReactNode } from 'react'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { font, flexDown, spacing } = styleguide

const { light, dark } = ThemeType

const useStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: 13,
		top: 10
	},
	drawer: {
		...flexDown,
		...font.body,
		color: themedStyles[light].base.color,
		padding: spacing.l,
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $drawer': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

interface DrawerProps {
	classes?: string[]
	children: ReactNode
	onClose: () => void
}

const Drawer: FC<DrawerProps> = ({
	classes = [],
	children,
	onClose
}: DrawerProps) => {
	const drawerClasses = useStyles()

	return (
		<div className={cn(drawerClasses.drawer, classes)}>
			<IconButton
				classes={[drawerClasses.closeButton]}
				onClick={onClose}
				size={IconSizes.sm}
			/>
			{children}
		</div>
	)
}

export default Drawer
