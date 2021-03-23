import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mappedTypesToIcons } from 'components/NotificationV2/utils'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React, { FC, ReactNode, useState } from 'react'

const useStyles = createUseStyles({
	container: {
		border: '1px solid black'
	}
})

export interface BannerProps {
	children?: ReactNode
	classes?: string[]
	showIcon: boolean
	title: ReactNode
	type: NotificationTypes
}

export const Banner: FC<BannerProps> = ({
	children,
	classes = [],
	showIcon = true,
	title,
	type
}: BannerProps) => {
	const [renderBanner, setRenderBanner] = useState<boolean>(true)
	const componentClasses = useStyles()

	const toggleRender = () => setRenderBanner(!renderBanner)

	return (
		<div
			className={cn(componentClasses.container, classes)}
			style={{ display: !renderBanner ? 'none' : '' }}
		>
			<div>
				<div>
					{showIcon && (
						<FontAwesomeIcon icon={mappedTypesToIcons[type].icon} />
					)}
					<p>{title}</p>
				</div>
				<div onClick={() => toggleRender()}>
					<FontAwesomeIcon icon={faTimes} />
				</div>
			</div>
			<div>{children}</div>
		</div>
	)
}
