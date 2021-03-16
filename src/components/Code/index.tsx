import './prism.css'
import cn from 'classnames'
import Mark from 'mark.js'
import Prism from 'prismjs'
import { useStyles } from './utils'
import { Input, InputProps } from 'components/Input'
import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
require('prismjs/plugins/line-numbers/prism-line-numbers')
require('prismjs/components/prism-json')

export interface CodeProps {
	classes?: string[]
	code: string | Record<string, any>
	language?: 'css' | 'html' | 'javascript' | 'json'
	lineNumbers?: boolean
	readOnly?: boolean
	search?:
		| boolean
		| Omit<InputProps, 'addonAfter' | 'addonBefore' | 'onChange' | 'type'>
}

export const Code: FC<CodeProps> = ({
	classes = [],
	code,
	language = 'json',
	lineNumbers = true,
	readOnly = true,
	search = true
}: CodeProps) => {
	const compClasses = useStyles()
	const codeRef = useRef<HTMLElement>(null)

	useEffect(() => {
		Prism.highlightAll()
	}, [])

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const markInstance = new Mark(codeRef.current as HTMLElement)

		markInstance.unmark({
			done: () => {
				markInstance.mark(e.target.value)
			}
		})
	}

	let searchProps = {}

	if (search) {
		const { classes = [], fullWidth = true, placeholder = '' } =
			typeof search === 'object'
				? search
				: { classes: [], fullWidth: true, placeholder: '' }

		searchProps = {
			classes: [compClasses.search, ...classes],
			fullWidth,
			placeholder
		}
	}

	return (
		<>
			{search && <Input {...searchProps} onChange={onSearch} />}
			<pre
				className={cn({ 'line-numbers': lineNumbers }, classes)}
				contentEditable={!readOnly}
			>
				<code className={`language-${language}`} ref={codeRef}>
					{typeof code === 'string'
						? code
						: JSON.stringify(code, null, '\t')}
				</code>
			</pre>
		</>
	)
}
