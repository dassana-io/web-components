import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'
import { popoverPalette } from 'components/Popover/utils'
import { useCreateDomElement } from 'components/utils'
import React, { FC, ReactNode } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { flexCenter } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		...flexCenter,
		background: popoverPalette[light].background,
		bottom: 0,
		display: ({ isPopoverOpen }) => (isPopoverOpen ? 'flex' : 'none'),
		height: '100%',
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		width: '100%',
		zIndex: 10
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				background: popoverPalette[dark].background
			}
		}
	}
})

interface Props {
	children: ReactNode
	isPopoverOpen?: boolean
}

const FILTER_MODAL_ROOT_ID = 'filters-modal-root'

export const FilterModal: FC<Props> = ({ children, isPopoverOpen }: Props) => {
	const classes = useStyles({ isPopoverOpen })

	const rootElement = useCreateDomElement(FILTER_MODAL_ROOT_ID)

	return (
		rootElement &&
		createPortal(
			<div className={classes.container}>{children}</div>,
			rootElement
		)
	)
}
