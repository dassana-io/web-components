import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import {
	Banners,
	generateThemedBannerStyles,
	getBannerPreferences,
	isNewBanner,
	updateBannerPreferences
} from './utils'
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
				color: themedStyles.dark.base.color
			}
		}
	}
})

export interface BannerProps {
	id: string
	children?: ReactNode
	classes?: string[]
	persistBannerState?: boolean
	showIcon?: boolean
	title: ReactNode
	titleClasses?: string[]
	type: NotificationTypes
}

export const Banner: FC<BannerProps> = ({
	id,
	children,
	classes = [],
	persistBannerState = true,
	showIcon = false,
	title,
	titleClasses = [],
	type
}: BannerProps) => {
	const componentClasses = useStyles({ type })
	const iconClasses = cn({
		[componentClasses.icon]: true,
		[componentClasses[type]]: true
	})

	const banners: Banners = getBannerPreferences()

	const [renderBanner, setRenderBanner] = useState<boolean>(true)

	useLayoutEffect(() => {
		if (isNewBanner(banners, id)) {
			updateBannerPreferences(banners, id, true)
		} else if (!banners[id]) {
			setRenderBanner(false)
		}
	}, [banners, id])

	const onBannerClose = () => {
		setRenderBanner(false)

		if (persistBannerState) {
			updateBannerPreferences(banners, id, false)
		}
	}

	return (
		<>
			{renderBanner && (
				<div className={cn(componentClasses.container, classes)}>
					<div className={componentClasses.headerContainer}>
						<div className={componentClasses.header}>
							{showIcon && (
								<FontAwesomeIcon
									className={iconClasses}
									icon={mappedTypesToIcons[type].icon}
								/>
							)}
							<div
								className={cn(
									componentClasses.title,
									titleClasses
								)}
							>
								{title}
							</div>
						</div>
						<IconButton
							classes={[componentClasses.closeBtn]}
							onClick={onBannerClose}
						/>
					</div>
					<div>{children}</div>
				</div>
			)}
		</>
	)
}
