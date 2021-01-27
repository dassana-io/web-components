import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import { ShortcutMicrocopyProps } from './types'
import { Skeleton } from 'components/Skeleton'
import { getShortcutKeyItem, useStyles } from './utils'
import React, { FC, Fragment } from 'react'

export const ShortcutMicrocopy: FC<ShortcutMicrocopyProps> = ({
	classes = [],
	dataTag,
	loading = false,
	items = ['enter'],
	skeletonWidth = 80,
	shortcutMicrocopyRef
}: ShortcutMicrocopyProps) => {
	const componentClasses = useStyles()

	const renderShortcutKeys = () =>
		items.map((shortcut, i) => {
			const { text, icon } = getShortcutKeyItem(shortcut)

			return (
				<Fragment key={i}>
					{text && (
						<span className={componentClasses.keyName}>
							{`${text} `}
						</span>
					)}
					<span className={componentClasses.icon}>{icon}</span>
					{i + 1 < items.length && <span> + </span>}
				</Fragment>
			)
		})

	let optionalProps = {}

	if (shortcutMicrocopyRef) optionalProps = { ref: shortcutMicrocopyRef }

	return (
		<div
			className={cn(componentClasses.shortcutMicrocopy, classes)}
			{...getDataTestAttributeProp('shortcut-microcopy', dataTag)}
			{...optionalProps}
		>
			{loading ? (
				<Skeleton height={32} width={skeletonWidth} />
			) : (
				<div className={componentClasses.wrapper}>
					<span className={componentClasses.label}>{'press '}</span>
					{renderShortcutKeys()}
				</div>
			)}
		</div>
	)
}

export * from './types'
