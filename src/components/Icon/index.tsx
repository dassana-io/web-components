import Icons, { IconName } from './icons'
import React, { FC } from 'react'

export interface IconProps {
	/**
	 * The name of the icon.
	 */
	icon: IconName
	/**
	 * The width and height of the icon, in pixels.
	 */
	size?: number
}

const Icon: FC<IconProps> = ({ icon, size = 32 }: IconProps) => {
	return <img alt={icon} height={size} src={Icons[icon]} width={size} />
}

export default Icon
