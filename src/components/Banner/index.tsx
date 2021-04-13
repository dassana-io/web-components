import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateThemedBannerStyles } from './util'
import { IconButton } from 'components/IconButton'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React, { FC, ReactNode, useEffect, useState } from 'react'
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
		display: ({ renderBanner }) => (renderBanner ? 'block' : 'none'),
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
	children?: ReactNode
	classes?: string[]
	showIcon?: boolean
	title: ReactNode
	type: NotificationTypes
}

interface BannerPrefType {
	[key: string]: { isClosed: boolean }
}

export const Banner: FC<BannerProps> = ({
	children,
	classes = [],
	showIcon = false,
	title,
	type
}: BannerProps) => {
	const localStorage = window.localStorage
	const [bannerId, setBannerId] = useState<string>(`${type}-0`)
	const [bannerList, setBannerList] = useState<BannerPrefType>({
		[`${bannerId}`]: { isClosed: false }
	})

	const [renderBanner, setRenderBanner] = useState<boolean>(true)
	const componentClasses = useStyles({ renderBanner, type })
	const iconClasses = cn({
		[componentClasses.icon]: true,
		[componentClasses[type]]: true
	})

	const bannerSetup = () => {
		if (!localStorage.getItem('bannerPref'))
			localStorage.setItem('bannerPref', JSON.stringify(bannerList))
	}

	useEffect(() => {
		bannerSetup()
	}, [bannerId])

	const toggleRender = () => setRenderBanner(renderBanner => !renderBanner)

	return (
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
	)
}
