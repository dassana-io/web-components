import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import { PageLoader } from 'components/PageLoader'
import AceEditor, { IAceEditorProps } from 'react-ace'
import { CodeControls, DisplayCodeControls } from './CodeControls'
import { CodeType, copyToClipboard, stringifyCode, useStyles } from './utils'
import React, { FC, RefObject, useCallback, useRef, useState } from 'react'

// eslint-disable-next-line sort-imports
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/mode-markdown'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-sql'
import 'ace-builds/src-min-noconflict/mode-yaml'

const languages = ['markdown', 'json', 'sql', 'yaml'] as const

export interface CodeProps
	extends Pick<
		IAceEditorProps,
		| 'commands'
		| 'debounceChangePeriod'
		| 'defaultValue'
		| 'focus'
		| 'height'
		| 'maxLines'
		| 'onLoad'
		| 'placeholder'
		| 'showGutter'
		| 'tabSize'
		| 'width'
		| 'wrapEnabled'
	> {
	classes?: string[]
	code?: CodeType
	dataTag?: string
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
	dataTag,
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

	const ref = useRef<AceEditor>(null)
	const compRef = editorRef || ref

	const [isWrapped, setIsWrapped] = useState(wrapEnabled)

	const compClasses = useStyles()

	const copyCode = useCallback(
		(onCopySuccess: () => void) => {
			if (compRef.current)
				copyToClipboard(
					compRef.current.editor.getValue(),
					onCopySuccess
				)
		},
		[compRef]
	)

	return loading ? (
		<PageLoader classes={pageLoaderClasses} />
	) : (
		<div
			className={cn(compClasses.wrapper, classes)}
			{...getDataTestAttributeProp('code-editor', dataTag)}
		>
			{displayControls && (
				<CodeControls
					classes={[compClasses.controls]}
					displayControls={displayControls}
					onClickCopyCode={copyCode}
					onClickWrapCode={() => setIsWrapped(oldVal => !oldVal)}
				/>
			)}
			<AceEditor
				className={compClasses.aceEditor}
				editorProps={{ $blockScrolling: true }}
				mode={language}
				onChange={onChange}
				readOnly={readOnly}
				ref={compRef}
				setOptions={{
					useWorker: false
				}} // To fix this issue --> https://github.com/securingsincity/react-ace/issues/725#issuecomment-546711308
				tabSize={tabSize}
				value={code && stringifyCode(code)}
				wrapEnabled={isWrapped}
				{...rest}
			/>
		</div>
	)
}

export type { AceEditor }
