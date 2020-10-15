import colors from './colors'

const borderRadius = 4

export const defaultFieldWidth = '300px'
export const fieldErrorStyles = {
	'@global': {
		'@keyframes shake': {
			'0%, 100%': { left: '0rem' },
			'20%, 60%': { left: '0.5rem' },
			'40%, 80%': { left: '-0.5rem' }
		}
	},
	error: {
		animation: 'shake 0.2s ease-in-out 0s 2'
	}
}

export const styleguide = {
	borderRadius,
	colors,
	font: {
		body: { fontSize: 14 },
		h1: { fontSize: 32 },
		h2: { fontSize: 24 },
		h3: { fontSize: 20 },
		label: { fontSize: 12 }
	},
	// eslint-disable-next-line sort-keys
	spacing: { s: 8, m: 16, l: 24, xl: 32 }
}
