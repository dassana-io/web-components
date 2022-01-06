import cn from 'classnames'
import { CodeControls } from 'components/Code/CodeControls'
import { getJSONPathValue } from 'components/utils'
import noop from 'lodash/noop'
import { useStyles } from './styles'
import { copyToClipboard, stringifyCode } from 'components/Code/utils'
import { getJSONValueType, JSONDataTypes, recursiveRender } from './utils'
import React, { FC } from 'react'

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue }

export interface JSONPathPickerProps {
	classes?: string[]
	disableKeyClick?: boolean
	displayControls?: boolean
	json: Record<string, JSONValue>
	path: string
	onChange?: (path: string) => void
}

export const JSONPathPicker: FC<JSONPathPickerProps> = ({
	classes = [],
	disableKeyClick = false,
	displayControls = true,
	json,
	path,
	onChange = noop
}: JSONPathPickerProps) => {
	const compClasses = useStyles(disableKeyClick)

	const copyJSON = (onCopySuccess: () => void) =>
		copyToClipboard(stringifyCode(json), onCopySuccess)

	return (
		<div className={cn(compClasses.container, classes)}>
			{displayControls && (
				<CodeControls
					classes={[compClasses.controls]}
					onClickCopyCode={copyJSON}
				/>
			)}
			<div className={compClasses.wrapper}>
				{recursiveRender({
					classes: compClasses,
					currPath: '$',
					disableKeyClick,
					isLastItem: true,
					onChange,
					pickedPath: path,
					remainingJSON: json
				})}
			</div>
		</div>
	)
}

export { getJSONPathValue, getJSONValueType, JSONDataTypes }
