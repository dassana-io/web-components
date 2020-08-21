import Icons, { IconName } from './IconsMap'
import React, { FC } from 'react'

export type { IconName }

interface SharedIconProps {
	/**
	 * The height of the icon, in pixels. Width will be calculated by default.
	 */
	height?: number
}

interface IconPath extends SharedIconProps {
	/**
	 * The url of the icon if rendering a custom icon.
	 *
	 */
	icon: string
	/**
	 * The name of the icon if using icons provided by Dassana. **Note**: Either an `icon` or `iconKey` is required.
	 */
	iconKey?: never
}

interface IconKey extends SharedIconProps {
	iconKey: IconName
	icon?: never
}

export type IconProps = IconKey | IconPath

const Icon: FC<IconProps> = ({ height = 32, ...props }: IconProps) => {
	const { icon } = props as IconPath
	const { iconKey } = props as IconKey

	const imgSrc = iconKey ? Icons[iconKey] : icon
	const imgAlt = iconKey ? iconKey : icon

	return <img alt={imgAlt} height={height} src={imgSrc} />
}

export default Icon
