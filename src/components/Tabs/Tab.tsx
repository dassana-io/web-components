import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedActiveTabStyles } from './utils'
import { IconButton } from 'components/IconButton'
import { faTrash, faX } from '@fortawesome/pro-light-svg-icons'
import React, { type FC, useCallback, useState } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'
import { type TabConfig, type TabsProps } from '.'

const { dark, light } = ThemeType

const {
	colors: { blacks, reds },
	flexAlignCenter,
	font,
	fontWeight,
	spacing
} = styleguide

interface StyleProps {
	hasControls: boolean
	isActiveTab: boolean
}

const useStyles = createUseStyles({
	actionIcon: {
		opacity: ({ isActiveTab }: StyleProps) => (isActiveTab ? 1 : 0),
		paddingLeft: spacing.s
	},
	activeTab: {},
	deleteIcon: {
		'&:hover': {
			color: reds.base
		}
	},
	disabled: {},
	pending: {},
	tab: {
		'&$activeTab': { ...generateThemedActiveTabStyles(light) },
		'&$disabled': {
			'& $tabLabelContent': {
				pointerEvents: 'none'
			},
			cursor: 'not-allowed'
		},
		'&$pending': {
			display: 'none'
		},
		'&:hover': {
			'& $actionIcon': {
				opacity: 1
			}
		},
		...font.body,
		borderBottom: '1px solid transparent',
		color: blacks['lighten-50'],
		cursor: 'pointer',
		display: 'inline-block',
		fontWeight: fontWeight.regular,
		listStyle: 'none',
		margin: ({ hasControls }: StyleProps) => {
			return hasControls ? `0 ${spacing.s}px` : `0 ${spacing.m}px`
		},
		padding: { bottom: spacing.m, top: spacing.m },
		textAlign: 'center'
	},
	tabControls: {
		...flexAlignCenter,
		'&:not(:empty)': {
			paddingLeft: spacing.xs
		}
	},
	tabLabelContent: {
		...flexAlignCenter,
		minHeight: 32
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $tab': {
				'& $deleteIcon:hover': {
					color: reds.base
				},
				'&$activeTab': generateThemedActiveTabStyles(dark)
			}
		}
	}
})

interface TabProps
	extends Pick<TabsProps, 'activeTabClasses' | 'disabled' | 'tabClasses'>,
		Pick<TabConfig, 'onClose' | 'onDelete' | 'label' | 'pending'> {
	isActiveTab: boolean
	tabIndex: number
	onClickTab: (tabIndex: number) => void
}

const Tab: FC<TabProps> = ({
	activeTabClasses = [],
	disabled,
	isActiveTab,
	label,
	onClickTab,
	onClose,
	onDelete,
	tabClasses = [],
	tabIndex
}: TabProps) => {
	const [pending, setPending] = useState(false)

	const classes = useStyles({
		// eslint-disable-next-line
		hasControls: !!(onClose || onDelete),
		isActiveTab
	})

	const tabCmpClasses = cn(
		{
			[classes.tab]: true,
			[classes.activeTab]: isActiveTab,
			[classes.disabled]: disabled,
			[classes.pending]: pending,
			[cn(activeTabClasses)]: isActiveTab
		},
		tabClasses
	)

	const onControlsError = useCallback(() => setPending(false), [])

	const handleOnCloseClick = useCallback(() => {
		if (!onClose) return

		setPending(true)

		onClose(tabIndex, onControlsError)
	}, [onClose, onControlsError, tabIndex])

	const handleOnDeleteClick = useCallback(() => {
		if (!onDelete) return

		onDelete(tabIndex)
	}, [onDelete, tabIndex])

	return (
		<li
			className={tabCmpClasses}
			onClick={() => !disabled && onClickTab(tabIndex)}
		>
			<div className={classes.tabLabelContent}>
				{label}
				<div className={classes.tabControls}>
					{onDelete && isActiveTab && (
						<IconButton
							classes={[classes.actionIcon, classes.deleteIcon]}
							disabled={disabled}
							icon={faTrash}
							onClick={handleOnDeleteClick}
						/>
					)}
					{onClose && (
						<IconButton
							classes={[classes.actionIcon]}
							disabled={disabled}
							icon={faX}
							onClick={handleOnCloseClick}
						/>
					)}
				</div>
			</div>
		</li>
	)
}

export default Tab
