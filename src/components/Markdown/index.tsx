import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import {
	generateThemedMarkdownCodeStyles,
	generateThemedMarkdownPreStyles,
	generateThemedMarkdownStyles,
	markdownPalette
} from './styles'
import React, { FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { font, fontWeight } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		'.markdown-body': {
			...generateThemedMarkdownStyles(light),
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
			remarkPlugins={[gfm]}
		>
			{children}
		</ReactMarkdown>
	)
}
