import './prism.css'
import cn from 'classnames'
import Prism from 'prismjs'
import React, { FC, useEffect } from 'react'
require('prismjs/plugins/line-numbers/prism-line-numbers')
require('prismjs/components/prism-json')

// overwriting default styles react example https://github.com/reactjs/reactjs.org/blob/master/src/prism-styles.js#L11
export interface CodeProps {
	code: string | Record<string, any>
	language?: 'json' | 'javascript'
	lineNumbers?: boolean
	readOnly?: boolean
}

export const Code: FC<CodeProps> = ({
	code,
	language = 'json',
	lineNumbers = true,
	readOnly = true
}: CodeProps) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])

	return (
		<pre
			className={cn({ 'line-numbers': lineNumbers })}
			contentEditable={!readOnly}
		>
			<code className={`language-${language}`}>
				{typeof code === 'string'
					? code
					: JSON.stringify(code, null, '\t')}
			</code>
		</pre>
	)
}
