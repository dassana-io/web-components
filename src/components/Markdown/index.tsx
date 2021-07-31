import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateLinkStyles } from '../Link/utils'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { font, fontWeight } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		'.markdown-body': {
			'& a': generateLinkStyles(light)['&.ant-typography'],
			'& pre': {
				'& code': {
					backgroundColor: themes[light].state.disabled,
					color: 'unset',
					textShadow: 'none'
				}
			},
			...font.body,
			color: themes[light].text.primary,
			fontWeight: fontWeight.light
		},
		[`.${dark}`]: {
			'& .markdown-body': {
				'& a': generateLinkStyles(dark)['&.ant-typography'],
				'& pre': {
					'& code': {
						backgroundColor: themes[dark].state.disabled
					}
				},
				color: themes[dark].text.primary
			}
		}
	}
})

export interface MarkdownProps {
	children: string
	classes?: string[]
}

export const Markdown: FC<MarkdownProps> = ({
	children,
	classes = []
}: MarkdownProps) => {
	useStyles()

	return (
		<ReactMarkdown className={cn('markdown-body', classes)} plugins={[gfm]}>
			{children}
		</ReactMarkdown>
	)
}
