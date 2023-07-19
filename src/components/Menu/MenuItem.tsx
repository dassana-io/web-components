import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { useMenuContext } from './MenuContext'
import {
	type CommonMenuProps,
	generateThemedMenuItemActiveStyles,
	generateThemedMenuItemStyles
} from './utils'
import React, { type FC, type Key } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { font, fontWeight, spacing } = styleguide

const { light, dark } = ThemeType

const useStyles = createUseStyles({
	active: {},
	menuItem: {
		...generateThemedMenuItemStyles(light),
		'&$active': {
			...generateThemedMenuItemActiveStyles(light),
			fontWeight: fontWeight.regular
		},
		borderRight: '2px solid',
		borderRightColor: 'transparent',
		cursor: 'pointer',
		fontSize: font.body.fontSize,
		fontWeight: fontWeight.light,
		height: spacing.xl,
		lineHeight: `${spacing.xl}px`,
		overflow: 'hidden',
		padding: `0 ${spacing.s}px 0 ${spacing.xl}px`,
		textAlign: 'left',
		textOverflow: 'ellipsis',
		transition:
			'font-weight 0.3s, background-color 0.3s, border-right-color 0.3s',
		whiteSpace: 'nowrap'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $menuItem': {
				...generateThemedMenuItemStyles(dark),
				'&$active': generateThemedMenuItemActiveStyles(dark)
			}
		}
	}
})

export interface MenuItemProps extends Omit<CommonMenuProps, 'name'> {
	menuKey: Key
}

const MenuItem: FC<MenuItemProps> = ({
	children,
	classes = [],
	menuKey
}: MenuItemProps) => {
	const { activeKey, onClick } = useMenuContext()

	const menuItemClasses = useStyles()

	const menuItemClassName = cn(
		{
			[menuItemClasses.menuItem]: true,
			[menuItemClasses.active]: activeKey === menuKey
		},
		classes
	)

	return (
		<li className={menuItemClassName} onClick={() => onClick(menuKey)}>
			{children}
		</li>
	)
}

export default MenuItem
