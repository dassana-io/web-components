import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'
import { commonListStyles, type CommonMenuProps } from './utils'
import { type MenuContextProps, MenuContextProvider } from './MenuContext'
import React, { type Key } from 'react'

const useStyles = createUseStyles({
	menu: commonListStyles
})

export interface MenuProps
	extends Omit<CommonMenuProps, 'name'>,
		Pick<MenuContextProps, 'onClick'> {
	activeKey: Key
}

export const Menu = ({
	children,
	classes = [],
	activeKey,
	onClick
}: MenuProps) => {
	const menuClasses = useStyles()

	return (
		<ul className={cn(menuClasses.menu, classes)}>
			<MenuContextProvider
				value={{
					activeKey,
					onClick
				}}
			>
				{children}
			</MenuContextProvider>
		</ul>
	)
}

Menu.ItemGroup = MenuItemGroup
Menu.Item = MenuItem
