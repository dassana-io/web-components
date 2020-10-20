import colors from './colors'

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
	borderRadius: 4,
	colors,
	flexCenter: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center'
	},
	flexDown: {
		display: 'flex',
		flexDirection: 'column'
	},
	flexSpaceBetween: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	font: {
		body: { fontSize: 14, lineHeight: 22 },
		bodyLarge: { fontSize: 16, lineHeight: 24 },
		h1: { fontSize: 32, lineHeight: 40 },
		h2: { fontSize: 24, lineHeight: 32 },
		h3: { fontSize: 20, lineHeight: 28 },
		label: { fontSize: 12, lineHeight: 20 }
	},
	// eslint-disable-next-line sort-keys
	spacing: { s: 8, m: 16, l: 24, xl: 32 }
}
