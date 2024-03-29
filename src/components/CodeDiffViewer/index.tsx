import './Prism.css'
import cn from 'classnames'
import { CodeControls } from '../Code/CodeControls'
import { type CodeProps } from '../Code'
import { copyToClipboard } from '../Code/utils'
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // eslint-disable-line sort-imports
import 'prismjs/components/prism-yaml'
import { diffCmpStyles, useStyles } from './styles'
import React, { type FC, useCallback, useMemo } from 'react'
import ReactDiffViewer, { type ReactDiffViewerProps } from 'react-diff-viewer'

const { css, javascript, yaml, json, sql } = Prism.languages

export enum CodeLanguages {
	css = 'css',
	javascript = 'javascript',
	json = 'json',
	sql = 'sql',
	yaml = 'yaml'
}

interface LanguageConfig {
	language: Prism.Grammar
	normalizer?: (str: string) => string
}

const normalizeYamlStr = (str: string) => {
	// Fixes prism parser not applying syntax highlighting to lines that end with ':'
	if (str.slice(-1) === ':') str = `${str} `

	return str
}

const prismLanguageMap: Record<CodeLanguages, LanguageConfig> = {
	[CodeLanguages.css]: { language: css },
	[CodeLanguages.javascript]: { language: javascript },
	[CodeLanguages.json]: { language: json },
	[CodeLanguages.sql]: { language: sql },
	[CodeLanguages.yaml]: { language: yaml, normalizer: normalizeYamlStr }
}

export interface CodeDiffViewerProps {
	containerClasses?: string[]
	displayControls?: CodeProps['displayControls']
	extraLinesSurroundingDiff?: ReactDiffViewerProps['extraLinesSurroundingDiff']
	hideLineNumbers?: ReactDiffViewerProps['hideLineNumbers']
	language: CodeLanguages
	leftTitle?: ReactDiffViewerProps['leftTitle']
	newCode: string
	oldCode: string
	rightTitle?: ReactDiffViewerProps['rightTitle']
	splitView?: boolean
	useDarkTheme?: boolean
}

export const CodeDiffViewer: FC<CodeDiffViewerProps> = ({
	containerClasses = [],
	displayControls = {},
	extraLinesSurroundingDiff = 3,
	hideLineNumbers = false,
	language,
	leftTitle,
	newCode,
	oldCode,
	rightTitle,
	splitView = true,
	useDarkTheme = true
}: CodeDiffViewerProps) => {
	const hasTitle = useMemo(
		() => leftTitle ?? rightTitle,
		[leftTitle, rightTitle]
	)
	const classes = useStyles({ hasTitle })

	const copyCode = useCallback(
		(onCopySuccess: () => void) => {
			copyToClipboard(newCode, onCopySuccess)
		},
		[newCode]
	)

	const highlightSyntax = (str: string) => {
		if (str) {
			const { language: prismGrammar, normalizer } =
				prismLanguageMap[language]

			if (normalizer) str = normalizer(str)

			return (
				<span
					dangerouslySetInnerHTML={{
						__html: Prism.highlight(str, prismGrammar, language)
					}}
				/>
			)
		}

		return <span />
	}

	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			{displayControls && (
				<CodeControls
					classes={[classes.controls]}
					displayControls={{ ...displayControls, wrap: false }}
					onClickCopyCode={copyCode}
				/>
			)}
			{/* Extra 'wrapper' div is to make CodeControls stick to top when scrolling */}
			<div className={classes.wrapper}>
				<ReactDiffViewer
					extraLinesSurroundingDiff={extraLinesSurroundingDiff}
					hideLineNumbers={hideLineNumbers}
					leftTitle={leftTitle}
					newValue={newCode}
					oldValue={oldCode}
					renderContent={highlightSyntax}
					rightTitle={rightTitle}
					splitView={splitView}
					styles={diffCmpStyles}
					useDarkTheme={useDarkTheme}
				/>
			</div>
		</div>
	)
}
