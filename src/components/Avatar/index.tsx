import 'antd/lib/avatar/style/index.css'
import { Avatar as AntDAvatar } from 'antd'
import { AvatarProps as AntDAvatarProps } from 'antd/lib/avatar'
import React, { FC, ReactNode } from 'react'

interface SharedAvatarProps {
	/**
	 * Letter type unit distance between left and right sides.
	 */
	gap?: number
	/**
	 * Avatar size. Can be a number (pixels) or predefined sizes of small, large, and default.
	 */
	size?: AntDAvatarProps['size']
}

interface AvatarIcon extends SharedAvatarProps {
	/**
	 * Icon to render as the avatar.
	 */
	icon: ReactNode
	children?: never
}

interface GeneralAvatar extends SharedAvatarProps {
	icon?: never
	/**
	 * Avatar children to render. **Note**: Either `children` or `icon` is required.
	 */
	children: ReactNode
}

export type AvatarProps = GeneralAvatar | AvatarIcon

const Avatar: FC<AvatarProps> = ({
	children,
	gap,
	icon,
	size
}: AvatarProps) => (
	<AntDAvatar gap={gap} icon={icon} size={size}>
		{children}
	</AntDAvatar>
)

export default Avatar
