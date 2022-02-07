import 'antd/lib/avatar/style/index.css'
import { Avatar as AntDAvatar } from 'antd'
import { AvatarProps as AntDAvatarProps } from 'antd/lib/avatar'
import { createUseStyles } from 'react-jss'
import React, { FC, ReactNode } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark } = ThemeType

const {
	colors: { blacks }
} = styleguide

const avatarStyles = {
	background: blacks['lighten-30'],
	color: blacks['lighten-80']
}

const useStyles = createUseStyles({
	avatar: avatarStyles,
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $avatar': avatarStyles
		}
	}
})

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

export const Avatar: FC<AvatarProps> = ({
	children,
	gap,
	icon,
	size
}: AvatarProps) => {
	const classes = useStyles()

	return (
		<AntDAvatar
			className={classes.avatar}
			gap={gap}
			icon={icon}
			size={size}
		>
			{children}
		</AntDAvatar>
	)
}
