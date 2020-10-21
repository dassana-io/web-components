import Icons, { IconKeys, IconName } from './IconsMap'
import React, { FC } from 'react'

export interface SharedIconProps {
	/**
	 * The height of the icon, in pixels. Width will be calculated by default.
	 */
	height?: number
}

interface IconPath extends SharedIconProps {
	/**
	 * The url of the icon if rendering a custom icon.
	 */
	icon: string
	/**
	 * The name of the icon if using icons provided by Dassana. **Note**: Either an `icon` or `iconKey` is required.
	 */
	iconKey?: never
}

interface IconKey extends SharedIconProps {
	color?: string
	iconKey: IconName
	icon?: never
}

export type IconProps = IconKey | IconPath

export const Icon: FC<IconProps> = ({ height = 32, ...props }: IconProps) => {
	const { icon } = props as IconPath
	const { iconKey } = props as IconKey

	if (iconKey) {
		const Svg = Icons[iconKey]

		const { color = '#7E8083' } = props as IconKey

		return <Svg fill={color} height={height} width={height} />
	}

	return <img alt={icon} height={height} src={icon} />
}

export type { IconName }

export { IconKeys }
