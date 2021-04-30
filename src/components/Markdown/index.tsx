import { createUseStyles } from 'react-jss'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import React, { FC } from 'react'
import { themes, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		'.markdown-body': {
			'& code': {
				backgroundColor: themes[light].state.disabled
			},
			color: themes[light].text.primary
		},
		[`.${dark}`]: {
			'& .markdown-body': {
				'& code': {
					backgroundColor: themes[dark].state.disabled
				},
				color: themes[dark].text.primary
			}
		}
	}
})

export interface MarkdownProps {
	children: string
}

export const Markdown: FC<MarkdownProps> = ({ children }: MarkdownProps) => {
	useStyles()

	return (
		<ReactMarkdown className='markdown-body' plugins={[gfm]}>
			{children}
		</ReactMarkdown>
	)
}
