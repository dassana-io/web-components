import cn from 'classnames'
import { CodeControls } from 'components/Code/CodeControls'
import { copyToClipboard } from 'components/Code/utils'
import { recursiveRender } from './utils'
import { useStyles } from './styles'
import React, { FC, useState } from 'react'

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

	const copyJSON = () => {
		copyToClipboard(JSON.stringify(json, null, '\t'), () =>
			setIsCopied(true)
		)
	}

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
