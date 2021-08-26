import cn from 'classnames'
import { PageLoader } from 'components/PageLoader'
import AceEditor, { IAceEditorProps } from 'react-ace'
import { CodeControls, DisplayCodeControls } from './CodeControls'
import { CodeType, copyToClipboard, stringifyCode, useStyles } from './utils'
import React, { FC, RefObject, useEffect, useState } from 'react'

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
		| 'defaultValue'
		| 'focus'
		| 'height'
		| 'maxLines'
		| 'showGutter'
		| 'tabSize'
		| 'width'
		| 'wrapEnabled'
	> {
	classes?: string[]
	code?: CodeType
	displayControls?: DisplayCodeControls | false
	editorRef?: RefObject<AceEditor>
	language?: typeof languages[number]
	loading?: boolean
	pageLoaderClasses?: string[]
	readOnly?: boolean
	onChange?: (val: string) => void
}

export const Code: FC<CodeProps> = ({
	classes = [],
	code,
	displayControls = {},
	editorRef,
	onChange,
	language = 'json',
	loading = false,
	pageLoaderClasses = [],
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

	return loading ? (
		<PageLoader classes={pageLoaderClasses} />
	) : (
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
				ref={editorRef}
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

export type { AceEditor }
