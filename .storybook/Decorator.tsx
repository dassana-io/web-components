import React, { FC, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { ThemeType, themes } from '../src/components/assets/styles/themes'
import cn from 'classnames'
const { dark } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark} .decorator`]: {
			backgroundColor: themes[dark].background.secondary
		}
	},
	decorator: {
		padding: '1rem'
	}
})

export interface DecoratorProps {
	children: ReactNode
	classes?: string[]
}

const Decorator: FC<DecoratorProps> = ({
	children,
	classes = []
}: DecoratorProps) => {
	const decoratorClasses = useStyles()

	return (
		<div
			className={cn(decoratorClasses.decorator, 'decorator', ...classes)}
		>
			{children}
		</div>
	)
}

export default Decorator
