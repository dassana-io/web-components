import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '../IconButton'
import { AceEditor, Code } from '../Code'
import {
	COLLAPSED_CONTAINER_HEIGHT,
	generatedThemedHeightToggleStyles,
	generatedThemedQueryContainerStyles
} from './styles'
import {
	faChevronDown,
	faChevronUp,
	faSearch
} from '@fortawesome/pro-light-svg-icons'
import React, {
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const {
	borderRadius,
	flexAlignCenter,
	flexDown,
	flexSpaceBetween,
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	code: {
		height: '100%',
		width: '100% !important'
	},
	codeContainer: {
		height: ({ fixedContainerHeight }) =>
			fixedContainerHeight ? COLLAPSED_CONTAINER_HEIGHT : 'auto'
	},
	footerContainer: {
		paddingTop: spacing.m
	},
	header: {
		...flexAlignCenter,
		...flexSpaceBetween,
		cursor: 'pointer',
		fontWeight: fontWeight.light,
		paddingBottom: spacing.m,
		width: '100%'
	},
	heightToggle: {
		...generatedThemedHeightToggleStyles(light),
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
	nameContainer: {
		width: 'max-content'
	},
	queryContainer: {
		...flexDown,
		...font.body,
		...generatedThemedQueryContainerStyles(light),
		borderRadius,
		padding: spacing.m,
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $heightToggle': generatedThemedHeightToggleStyles(dark),
			'& $queryContainer': generatedThemedQueryContainerStyles(dark)
		}
	}
})

interface QueryDisplayProps {
	containerClasses?: string[]
	controlsContainerClasses?: string[]
	footerContainerClasses?: string[]
	nameContainerClasses?: string[]
	name: ReactNode | string
	loading?: boolean
	onQueryClick: () => void
	query: string
	renderControls?: () => ReactNode
	renderFooter?: () => ReactNode
}

export const QueryDisplay: FC<QueryDisplayProps> = ({
	containerClasses = [],
	controlsContainerClasses = [],
	footerContainerClasses = [],
	nameContainerClasses = [],
	loading = false,
	name,
	onQueryClick,
	query,
	renderControls,
	renderFooter
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
		<div
			className={cn({ [classes.queryContainer]: true }, containerClasses)}
		>
			<div className={classes.header} onClick={onQueryClick}>
				<div
					className={cn(
						{ [classes.nameContainer]: true },
						nameContainerClasses
					)}
				>
					<span>{name}</span>
					<IconButton
						classes={[classes.launch]}
						icon={faSearch}
						onClick={onQueryClick}
					/>
				</div>
				{renderControls && (
					<div className={cn(controlsContainerClasses)}>
						{renderControls()}
					</div>
				)}
			</div>
			<div className={classes.codeContainer}>
				<Code
					classes={[classes.code]}
					code={query}
					displayControls={false}
					editorRef={editorRef}
					height='100%'
					highlightActiveLine={false}
					language='sql'
					loading={loading}
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
			{renderFooter && (
				<div
					className={cn(
						{ [classes.footerContainer]: true },
						footerContainerClasses
					)}
				>
					{renderFooter()}
				</div>
			)}
		</div>
	)
}
