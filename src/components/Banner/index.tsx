import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateThemedBannerStyles } from './util'
import { IconButton } from 'components/IconButton'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React, { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks, greens, oranges, reds },
	flexSpaceBetween,
	flexCenter,
	font,
	fontWeight,
	spacing
} = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	closeBtn: {
		cursor: 'pointer',
		padding: spacing['s+'],
		position: 'absolute',
		right: 0,
		top: 0
	},
	container: {
		...font.body,
		...generateThemedBannerStyles(light),
		fontWeight: fontWeight.light,
		padding: spacing.l,
		position: 'relative'
	},
	error: {
		color: reds.base
	},
	header: {
		...flexCenter,
		...font.bodyLarge
	},
	headerContainer: {
		...flexSpaceBetween
	},
	icon: {
		marginRight: spacing.s
	},
	info: {
		color: themedStyles.light.base.color
	},
	success: {
		color: greens.base
	},
	title: {
		color: blacks.base
	},
	warning: {
		color: oranges.base
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedBannerStyles(dark),
			'& $title': {
				color: themedStyles.light.base.color
			}
		}
	}
})

export interface BannerProps {
	id: string
	children?: ReactNode
	classes?: string[]
	showIcon?: boolean
	title: ReactNode
	type: NotificationTypes
}

interface Banners {
	[key: string]: boolean
}

export const getBanners = () => {
	const bannerPref = localStorage.getItem('bannerPref')
	return bannerPref ? JSON.parse(bannerPref) : {}
}

export const Banner: FC<BannerProps> = ({
	id,
	children,
	classes = [],
	showIcon = false,
	title,
	type
}: BannerProps) => {
	const componentClasses = useStyles({ type })
	const iconClasses = cn({
		[componentClasses.icon]: true,
		[componentClasses[type]]: true
	})

	const banners: Banners = getBanners()

	const [renderBanner, setRenderBanner] = useState<boolean>(
		!(id in banners) || banners[id] === true
	)

	useLayoutEffect(() => {
		if (banners[id] === false) {
			setRenderBanner(false)
		} else if (banners[id] === undefined) {
			localStorage.setItem(
				'bannerPref',
				JSON.stringify({
					...banners,
					[id]: true
				})
			)
		}
	}, [banners, id])

	const toggleRender = () => {
		setRenderBanner(false)
		localStorage.setItem(
			'bannerPref',
			JSON.stringify({
				...banners,
				[id]: false
			})
		)
	}

	return renderBanner ? (
		<div className={cn(componentClasses.container, classes)}>
			<div className={componentClasses.headerContainer}>
				<div className={componentClasses.header}>
					{showIcon && (
						<FontAwesomeIcon
							className={iconClasses}
							icon={mappedTypesToIcons[type].icon}
						/>
					)}
					<div className={componentClasses.title}>{title}</div>
				</div>
				<IconButton
					classes={[componentClasses.closeBtn]}
					onClick={toggleRender}
				/>
			</div>
			<div>{children}</div>
		</div>
	) : (
		<></>
	)
}
