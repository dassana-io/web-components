import { CollapseIndicator } from './CollapseIndicator'
import { createUseStyles } from 'react-jss'
import { generateAccordionPanelStyles } from './utils'
import { PanelContent } from './PanelContent'
import React, { FC, Key, ReactNode, useState } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { flexSpaceBetween, font, spacing } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	header: {
		...font.bodyLarge,
		...flexSpaceBetween,
		cursor: 'pointer',
		padding: spacing.m
	},
	panel: generateAccordionPanelStyles(light),
	title: {
		color: themes[light].primary
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $panel': generateAccordionPanelStyles(dark),
			'& $title': { color: themes[dark].state.hover }
		}
	}
})

export interface Panel {
	content: ReactNode
	key: Key
	title: string
}

interface SharedAccordionProps {
	defaultActiveKey?: Key
	panels: Panel[]
}

interface ExclusiveAccordionProps extends SharedAccordionProps {
	exclusive: true
	expandAllOnMount?: never
}

interface NonExclusiveAccordionProps extends SharedAccordionProps {
	exclusive: false
	expandAllOnMount?: boolean
}

export type AccordionProps =
	| ExclusiveAccordionProps
	| NonExclusiveAccordionProps

export const Accordion: FC<AccordionProps> = ({
	defaultActiveKey,
	exclusive = false,
	expandAllOnMount = false,
	panels
}: AccordionProps) => {
	const getInitialActiveKeys = () => {
		const defaultActiveKeys: Key[] = [panels[0].key]

		if (defaultActiveKey) return [defaultActiveKey]
		else if (expandAllOnMount) return panels.map(({ key }) => key)

		return defaultActiveKeys
	}

	const [activeKeys, setActiveKeys] = useState<Key[]>(getInitialActiveKeys())
	const classes = useStyles()

	const togglePanel = (panelKey: Key) => {
		let newActiveKeys = [...activeKeys, panelKey]

		// Close panel if it is open
		if (activeKeys.includes(panelKey))
			newActiveKeys = activeKeys.filter(key => panelKey !== key)
		// If accordion is exclusive, only one panel can be open at a time
		else if (exclusive) newActiveKeys = [panelKey]

		setActiveKeys(newActiveKeys)
	}

	return (
		<div>
			{panels.map(({ content, key, title }) => {
				const isActivePanel = activeKeys.includes(key)

				return (
					<div className={classes.panel} key={key}>
						<div
							className={classes.header}
							onClick={() => togglePanel(key)}
						>
							<div className={classes.title}>{title}</div>
							<CollapseIndicator isCollapsed={!isActivePanel} />
						</div>
						<PanelContent isActive={isActivePanel}>
							{content}
						</PanelContent>
					</div>
				)
			})}
		</div>
	)
}
