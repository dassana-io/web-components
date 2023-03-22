import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { ModalProps } from './Modal'
import { motion } from 'framer-motion'
import { themedModalStyles } from './utils'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const { flexCenter } = styleguide

const useStyles = createUseStyles({
	contentContainer: {
		...flexCenter,
		...themedModalStyles(light),
		borderLeft: `1px solid ${themes[light].border}`,
		height: '100vh',
		position: 'fixed',
		right: 0,
		top: 0,
		width: '40%',
		zIndex: 9999
	},
	overlay: {
		...flexCenter,
		...themedModalStyles(light),
		height: '100%',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '60%',
		zIndex: 9999
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $contentContainer': {
				...themedModalStyles(dark),
				borderLeft: `1px solid ${themes[dark].border}`
			},
			'& $overlay': {
				...themedModalStyles(dark)
			}
		}
	}
})

export const ModalDrawer: FC<ModalProps> = ({
	modalConfig,
	unsetModal
}: ModalProps) => {
	const { content, options = {} } = modalConfig

	const { contentContainerClasses = [], overlayClasses = [] } = options

	const modalClasses = useStyles()

	return (
		<>
			<motion.div
				animate={{
					x: 0
				}}
				className={cn(
					modalClasses.contentContainer,
					contentContainerClasses
				)}
				exit={{
					x: '100%'
				}}
				initial={{ x: '100%' }}
				transition={{ bounce: 0, duration: 0.4, type: 'spring' }}
			>
				{content}
			</motion.div>
			<motion.div
				animate={{
					opacity: 0.5
				}}
				className={cn(modalClasses.overlay, overlayClasses)}
				exit={{
					opacity: 0,
					transition: {
						delay: 0
					}
				}}
				initial={{ opacity: 0 }}
				onClick={unsetModal}
				transition={{
					bounce: 0,
					delay: 1,
					duration: 0.2,
					type: 'spring'
				}}
			/>
		</>
	)
}
