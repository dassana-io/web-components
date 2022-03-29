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
			'& code': {
				backgroundColor: themes[light].state.loading.primary,
				color: 'unset',
				textShadow: 'none',
				whiteSpace: 'break-spaces'
			},
			'& img': {
				backgroundColor: 'transparent'
			},
			'& pre': {
				'& code': {
					backgroundColor: 'transparent'
				},
				backgroundColor: themes[light].background.secondary,
				padding: 10
			},
			...font.body,
			color: themes[light].text.primary,
			fontWeight: fontWeight.light
		},
		[`.${dark}`]: {
			'& .markdown-body': {
				'& a': generateLinkStyles(dark)['&.ant-typography'],
				'& code': {
					backgroundColor: themes[dark].state.loading.primary
				},
				'& pre': {
					'& code': {
						backgroundColor: 'transparent'
					},
					backgroundColor: themes[dark].background.secondary
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
		<ReactMarkdown
			className={cn('markdown-body', classes)}
			remarkPlugins={[gfm]}
		>
			{children}
		</ReactMarkdown>
	)
}
