import cn from 'classnames'
import { CodeControls } from 'components/Code/CodeControls'
import { recursiveRender } from './utils'
import { useStyles } from './styles'
import { copyToClipboard, stringifyCode } from 'components/Code/utils'
import React, { FC, useEffect, useState } from 'react'

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue }

export interface JSONPathPickerProps {
	classes?: string[]
	displayControls?: boolean
	json: Record<string, JSONValue>
	path: string
	onChange: (path: string) => void
}

export const JSONPathPicker: FC<JSONPathPickerProps> = ({
	classes = [],
	displayControls = true,
	json,
	path,
	onChange
}: JSONPathPickerProps) => {
	const compClasses = useStyles()

	const [isCopied, setIsCopied] = useState(false)

	const copyJSON = () =>
		copyToClipboard(stringifyCode(json), () => setIsCopied(true))

	useEffect(() => {
		if (isCopied) setTimeout(() => setIsCopied(false), 1250)
	}, [isCopied])

	return (
		<div className={cn(compClasses.container, classes)}>
			{displayControls && (
				<CodeControls
					classes={[compClasses.controls]}
					isCopied={isCopied}
					onClickCopyCode={copyJSON}
				/>
			)}
			<div className={compClasses.wrapper}>
				{recursiveRender({
					classes: compClasses,
					currPath: '$',
					isLastItem: true,
					onChange,
					pickedPath: path,
					remainingJSON: json
				})}
			</div>
		</div>
	)
}
