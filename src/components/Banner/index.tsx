import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React, { FC, ReactNode, useState } from 'react'
import { styleguide, themedStyles } from 'components/assets/styles'

const {
	colors: { blacks, grays, greens, oranges, reds },
	flexSpaceBetween,
	flexCenter,
	font,
	fontWeight: { light },
	spacing
} = styleguide

const useStyles = createUseStyles({
	closeBtn: {
		cursor: 'pointer',
		padding: spacing['s+']
	},
	container: {
		...font.body,
		backgroundColor: grays['lighten-40'],
		color: blacks['lighten-30'],
		display: ({ renderBanner }) => (renderBanner ? 'block' : 'none'),
		fontWeight: light,
		padding: spacing.l
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
	}
})

export interface BannerProps {
	children?: ReactNode
	classes?: string[]
	showIcon?: boolean
	title: ReactNode
	type: NotificationTypes
}

export const Banner: FC<BannerProps> = ({
	children,
	classes = [],
	showIcon = false,
	title,
	type
}: BannerProps) => {
	const [renderBanner, setRenderBanner] = useState<boolean>(true)
	const componentClasses = useStyles({ renderBanner, type })
	const iconClasses = cn({
		[componentClasses.icon]: true,
		[componentClasses[type]]: true
	})

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
