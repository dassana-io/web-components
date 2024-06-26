import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'
import {
	generateThemedMarkdownCodeStyles,
	generateThemedMarkdownLinkStyles,
	generateThemedMarkdownPreStyles,
	generateThemedMarkdownStyles
} from './styles'
import React, { type FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { font, fontWeight } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		'.markdown-body': {
			...generateThemedMarkdownStyles(light),
			'& a': generateThemedMarkdownLinkStyles(light),
			'& code': {
				...generateThemedMarkdownCodeStyles(light),
				color: 'unset',
				textShadow: 'none',
				whiteSpace: 'break-spaces'
			},
			'& pre': {
				...generateThemedMarkdownPreStyles(light),
				padding: 10
			},
			...font.body,
			fontWeight: fontWeight.light
		},
		[`.${dark}`]: {
			'& .markdown-body': {
				...generateThemedMarkdownStyles(dark),
				'& a': generateThemedMarkdownLinkStyles(dark),
				'& code': generateThemedMarkdownCodeStyles(dark),
				'& pre': generateThemedMarkdownPreStyles(dark)
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
			rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
			remarkPlugins={[gfm]}
			remarkRehypeOptions={{}}
		>
			{children}
		</ReactMarkdown>
	)
}
