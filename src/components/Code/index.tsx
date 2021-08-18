import cn from 'classnames'
import AceEditor, { IAceEditorProps } from 'react-ace'
import { CodeControls, DisplayCodeControls } from './CodeControls'
import { CodeType, copyToClipboard, stringifyCode, useStyles } from './utils'
import React, { FC, useEffect, useState } from 'react'

// eslint-disable-next-line sort-imports
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/mode-jsx'

const languages = ['markdown', 'json', 'yaml'] as const

languages.forEach(lang => {
	require(`ace-builds/src-noconflict/mode-${lang}`)
	require(`ace-builds/src-noconflict/snippets/${lang}`)
})

export interface CodeProps
	extends Pick<
		IAceEditorProps,
		| 'debounceChangePeriod'
		| 'height'
		| 'showGutter'
		| 'tabSize'
		| 'width'
		| 'wrapEnabled'
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
				className={compClasses.aceEditor}
				editorProps={{ $blockScrolling: true }}
				mode={language}
				onChange={onChange}
				readOnly={readOnly}
				setOptions={{
					useWorker: false
				}} // To fix this issue --> https://github.com/securingsincity/react-ace/issues/725#issuecomment-546711308
				tabSize={tabSize}
				value={code && stringifyCode(code)}
				wrapEnabled={wrapEnabled}
				{...rest}
			/>
		</div>
	)
}
