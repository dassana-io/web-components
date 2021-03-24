import Close from '../assets/icons/close.svg'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
		fontWeight: light,
		padding: spacing.l
	},
	header: {
		...flexCenter,
		...font.bodyLarge,
		'& > p': {
			color: 'black'
		}
	},
	headerContainer: {
		...flexSpaceBetween
	},
	icon: {
		marginRight: spacing.s
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
	const componentClasses = useStyles()

	const toggleRender = () => setRenderBanner(!renderBanner)

	return (
		<div
			className={cn(componentClasses.container, classes)}
			style={{
				display: !renderBanner ? 'none' : ''
			}}
		>
			<div className={componentClasses.headerContainer}>
				<div className={componentClasses.header}>
					{showIcon && type && (
						<FontAwesomeIcon
							className={componentClasses.icon}
							icon={mappedTypesToIcons[type].icon}
						/>
					)}
					<p>{title}</p>
				</div>
				<div
					className={componentClasses.closeBtn}
					onClick={() => toggleRender()}
				>
					<img alt='Close banner' src={Close} />
				</div>
			</div>
			<div>{children}</div>
		</div>
	)
}
