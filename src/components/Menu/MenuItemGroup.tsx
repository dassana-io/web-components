import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { commonListStyles, type CommonMenuProps } from './utils'
import React, { type FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const {
	colors: { blacks },
	font,
	fontWeight,
	spacing
} = styleguide

const { dark } = ThemeType

const useStyles = createUseStyles({
	menuItems: commonListStyles,
	name: {
		...font.label,
		color: blacks['lighten-50'],
		fontWeight: fontWeight.light,
		height: 40,
		lineHeight: '40px',
		padding: `0 ${spacing.s}px 0 ${spacing.m}px`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $name': {
				color: blacks['lighten-40']
			}
		}
	}
})

export type MenuItemGroupProps = CommonMenuProps

const MenuItemGroup: FC<MenuItemGroupProps> = ({
	classes = [],
	children,
	name
}: MenuItemGroupProps) => {
	const menuItemGroupClasses = useStyles()

	return (
		<li className={cn(classes)}>
			<div className={menuItemGroupClasses.name}>{name}</div>
			<ul className={menuItemGroupClasses.menuItems}>{children}</ul>
		</li>
	)
}

export default MenuItemGroup
