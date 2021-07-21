import './plausible-exclusion.css'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import React, { FC, useEffect } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		height: '100%'
	},
	exclude: {
		padding: `0 ${spacing.xs}px`
	}
})

export const Plausible: FC = () => {
	const classes = useStyles()

	useEffect(() => {
		const excludePlausible = () => {
			const exclusionState =
				window.localStorage.plausible_ignore === 'true'

			if (exclusionState) {
				document
					.getElementById('plausible_not')!
					.classList.add('hidden')
				document
					.getElementById('plausible_yes')!
					.classList.remove('hidden')
				document.getElementById('plausible_button')!.innerHTML =
					'Stop excluding my visits'
			} else {
				document
					.getElementById('plausible_yes')!
					.classList.add('hidden')
				document
					.getElementById('plausible_not')!
					.classList.remove('hidden')
				document.getElementById('plausible_button')!.innerHTML =
					'Exclude my visits'
			}
		}

		window.addEventListener('load', excludePlausible)

		return () => window.removeEventListener('load', excludePlausible)
	})

	const toggleExclusion = () => {
		const exclusionState = window.localStorage.plausible_ignore === 'true'

		if (exclusionState) {
			delete window.localStorage.plausible_ignore
			document.getElementById('plausible_yes')!.classList.add('hidden')
			document.getElementById('plausible_not')!.classList.remove('hidden')
			document.getElementById('plausible_button')!.innerHTML =
				'Exclude my visits'
		} else {
			window.localStorage.plausible_ignore = 'true'
			document.getElementById('plausible_not')!.classList.add('hidden')
			document.getElementById('plausible_yes')!.classList.remove('hidden')
			document.getElementById('plausible_button')!.innerHTML =
				'Stop excluding my visits'
		}
	}

	return (
		<div className={classes.container}>
			<div className='container text-center mt-24'>
				<h1 className='text-5xl font-black dark:text-gray-100'>
					Plausible Exclude
				</h1>
				<div className='my-4 text-xl dark:text-gray-100'>
					Click the button below to toggle your exclusion in analytics
					for this site
				</div>
				<div className='my-4 text-xl dark:text-gray-100'>
					You currently
					<span
						className='dark:text-red-400 text-red-600 font-bold'
						id='plausible_not'
					>
						<span className={classes.exclude}>are not</span>
					</span>
					<span
						className='dark:text-green-400 text-green-600 font-bold hidden'
						id='plausible_yes'
					>
						<span className={classes.exclude}>are</span>
					</span>
					excluding your visits.
				</div>
				<button
					className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
					id='plausible_button'
					onClick={() => {
						toggleExclusion()
					}}
				>
					Exclude my visits
				</button>
			</div>
		</div>
	)
}
