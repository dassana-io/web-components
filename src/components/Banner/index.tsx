import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import { styleguide } from 'components/assets/styles'
import React, { FC, ReactNode, useState } from 'react'

const {
	colors: { blacks, grays },
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
	title: {
		color: blacks.base
	}
})

export interface BannerProps {
	children?: ReactNode
	classes?: string[]
	showIcon?: boolean
	title: ReactNode
	type?: NotificationTypes
}

export const Banner: FC<BannerProps> = ({
	children,
	classes = [],
	showIcon = false,
	title,
	type
}: BannerProps) => {
	const [renderBanner, setRenderBanner] = useState<boolean>(true)
	const componentClasses = useStyles({ renderBanner })

	const toggleRender = () => setRenderBanner(renderBanner => !renderBanner)

	return (
		<div className={cn(componentClasses.container, classes)}>
			<div className={componentClasses.headerContainer}>
				<div className={componentClasses.header}>
					{showIcon && type && (
						<FontAwesomeIcon
							className={componentClasses.icon}
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
