import Icons, { IconName } from './IconsMap'
import React, { FC } from 'react'

export type { IconName }

export interface IconProps {
	/**
	 * The url of the icon if you want Icon to render a custom icon.
	 */
	icon?: string
	/**
	 * The name of the icon if using icons provided by Dassana.
	 */
	iconKey?: IconName
	/**
	 * The height of the icon, in pixels. Width will be calculated by default.
	 */
	height?: number
}

const Icon: FC<IconProps> = ({ icon, iconKey, height = 32 }: IconProps) => {
	if (!icon && !iconKey)
		throw new Error('Icon requires either an iconKey or icon prop.')

	const imgSrc = iconKey ? Icons[iconKey] : icon
	const imgAlt = iconKey ? iconKey : icon

	return <img alt={imgAlt} height={height} src={imgSrc} />
}

export default Icon
