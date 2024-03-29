import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Header } from './Header'
import { PanelContent } from './PanelContent'
import { ThemeType } from '../assets/styles'
import {
	generateAccordionPanelStyles,
	getInitialExpandedKeys,
	getUpdatedExpandedKeys
} from './utils'
import React, { type FC, type Key, type ReactNode, useState } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	panel: generateAccordionPanelStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $panel': generateAccordionPanelStyles(dark)
		}
	}
})

export interface Panel {
	classes?: string[]
	content: ReactNode
	headerRightContent?: ReactNode
	key: Key
	title: ReactNode
}

export interface SharedAccordionProps {
	classes?: string[]
	defaultExpandedKeys?: Key[]
	panels: Panel[]
}

export interface ExpandSingleProps {
	expandMultiple: false
	expandAllOnMount?: never
}

export interface ExpandMultipleProps {
	expandMultiple: true
	expandAllOnMount?: boolean
}

export type AccordionProps = (ExpandSingleProps | ExpandMultipleProps) &
	SharedAccordionProps

export const Accordion: FC<AccordionProps> = ({
	classes = [],
	defaultExpandedKeys = [],
	expandMultiple = true,
	expandAllOnMount = false,
	panels
}: AccordionProps) => {
	const [expandedKeys, setExpandedKeys] = useState<Key[]>(
		getInitialExpandedKeys(panels, defaultExpandedKeys, expandAllOnMount)
	)
	const compClasses = useStyles()

	return (
		<div className={cn(classes)}>
			{panels.map(
				({ classes: panelClasses = [], content, key, ...rest }) => {
					const isExpanded = expandedKeys.includes(key)

					return (
						<div
							className={cn(compClasses.panel, panelClasses)}
							key={key}
						>
							<Header
								isExpanded={isExpanded}
								onHeaderClick={() => {
 setExpandedKeys(
										getUpdatedExpandedKeys(
											key,
											expandedKeys,
											expandMultiple
										)
									)
}
								}
								{...rest}
							/>
							<PanelContent isExpanded={isExpanded}>
								{content}
							</PanelContent>
						</div>
					)
				}
			)}
		</div>
	)
}
