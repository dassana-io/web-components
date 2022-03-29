import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '../IconButton'
import { AceEditor, Code } from '../Code'
import { COLLAPSED_CONTAINER_HEIGHT, colorPalette } from './styles'
import {
	faChevronDown,
	faChevronUp,
	faSearch
} from '@fortawesome/pro-light-svg-icons'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const { borderRadius, flexDown, font, fontWeight, spacing } = styleguide

const useStyles = createUseStyles({
	code: {
		height: '100%',
		resize: 'both',
		width: '100% !important'
	},
	codeContainer: {
		height: ({ fixedContainerHeight }) =>
			fixedContainerHeight ? COLLAPSED_CONTAINER_HEIGHT : 'auto'
	},
	header: {
		cursor: 'pointer',
		fontWeight: fontWeight.light,
		paddingBottom: spacing.m,
		width: 'max-content'
	},
	heightToggle: {
		'&:hover': {
			backgroundColor: colorPalette[light].hoverBackground
		},
		backgroundColor: colorPalette[light].secondaryBackground,
		border: `1px solid ${themedStyles[light].base.borderColor}`,
		borderRadius: '0 0 20% 20%',
		bottom: -spacing.l,
		cursor: 'pointer',
		padding: `0 ${spacing.xs}px`,
		position: 'absolute',
		right: 0,
		zIndex: 1
	},
	launch: {
		marginLeft: spacing.m
	},
	queryContainer: {
		...flexDown,
		...font.body,
		backgroundColor: colorPalette[light].secondaryBackground,
		borderRadius,
		color: colorPalette[light].color,
		padding: spacing.m,
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $heightToggle': {
				'&:hover': {
					backgroundColor: colorPalette[dark].hoverBackground
				},
				backgroundColor: colorPalette[dark].secondaryBackground,
				border: `1px solid ${themedStyles[dark].base.borderColor}`
			},
			'& $queryContainer': {
				backgroundColor: colorPalette[dark].secondaryBackground,
				color: colorPalette[dark].color
			}
		}
	}
})

interface QueryDisplayProps {
	name: string
	onQueryClick: () => void
	query: string
}

export const QueryDisplay: FC<QueryDisplayProps> = ({
	name,
	query,
	onQueryClick
}: QueryDisplayProps) => {
	const editorRef = useRef<AceEditor>(null)

	const [isExpanded, setIsExpanded] = useState(true)
	const [showExpander, setShowExpander] = useState(false)

	const classes = useStyles({ fixedContainerHeight: !isExpanded })

	const toggleContainerExpansion = useCallback(
		() => setIsExpanded(!isExpanded),
		[isExpanded]
	)

	useEffect(() => {
		if (editorRef.current) {
			const lines = editorRef.current.editor.getSession().getLength()

			setShowExpander(lines > 2)
		}
	}, [])

	return (
		<div className={classes.queryContainer}>
			<div className={classes.header} onClick={onQueryClick}>
				<span>{name}</span>
				<IconButton
					classes={[classes.launch]}
					icon={faSearch}
					onClick={onQueryClick}
				/>
			</div>
			<div className={classes.codeContainer}>
				<Code
					classes={[classes.code]}
					defaultValue={query}
					displayControls={false}
					editorRef={editorRef}
					height='100%'
					highlightActiveLine={false}
					language='sql'
					maxLines={Infinity}
					width='100%'
				/>
			</div>
			{showExpander && (
				<div
					className={classes.heightToggle}
					onClick={toggleContainerExpansion}
				>
					<FontAwesomeIcon
						icon={isExpanded ? faChevronUp : faChevronDown}
						size='xs'
					/>
				</div>
			)}
		</div>
	)
}
