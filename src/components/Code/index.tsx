import cn from 'classnames'
import AceEditor, { IAceEditorProps } from 'react-ace'
import { CodeControls, DisplayCodeControls } from './CodeControls'
import { CodeType, copyToClipboard, stringifyCode, useStyles } from './utils'
import React, { FC, useEffect, useState } from 'react'

// eslint-disable-next-line sort-imports
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/mode-jsx'
require('ace-builds/src-noconflict/theme-monokai')

const languages = [
	'html',
	'javascript',
	'java',
	'markdown',
	'json',
	'yaml'
] as const

languages.forEach(lang => {
	require(`ace-builds/src-noconflict/mode-${lang}`)
	require(`ace-builds/src-noconflict/snippets/${lang}`)
})

export interface CodeProps
	extends Pick<
		IAceEditorProps,
		'height' | 'tabSize' | 'width' | 'wrapEnabled'
	> {
	classes?: string[]
	code?: CodeType
	displayControls?: DisplayCodeControls | false
	language?: typeof languages[number]
	readOnly?: boolean
	onChange?: (val: string) => void
}

export const Code: FC<CodeProps> = ({
	classes = [],
	code,
	displayControls = {},
	onChange,
	language = 'json',
	readOnly = true,
	tabSize = 2,
	wrapEnabled = false,
	...rest
}: CodeProps) => {
	if (code && !readOnly && !onChange) {
		throw new Error('Controlled Code component requires an onChange prop')
	}

	const compClasses = useStyles()

	const [isCopied, setIsCopied] = useState(false)

	const copyCode = () => {
		if (code) copyToClipboard(stringifyCode(code), () => setIsCopied(true))
	}

	useEffect(() => {
		if (isCopied) setTimeout(() => setIsCopied(false), 1250)
	}, [isCopied])

	return (
		<div className={cn(compClasses.wrapper, classes)}>
			{displayControls && (
				<CodeControls
					classes={[compClasses.controls]}
					isCopied={isCopied}
					onClickCopyCode={copyCode}
				/>
			)}
			<AceEditor
				editorProps={{ $blockScrolling: true }}
				mode={language}
				onChange={onChange}
				readOnly={readOnly}
				tabSize={tabSize}
				theme='monokai'
				value={code && stringifyCode(code)}
				wrapEnabled={wrapEnabled}
				{...rest}
			/>
		</div>
	)
}
