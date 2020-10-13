import colors from './colors'

export const borderRadius = 4
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
export const fontSizeRegular = '14px'
export const linkColor = '#1EA7FD'
export * from './themes'
/* eslint-disable sort-keys */
export const styleguide = {
	colors,
	spacing: { s: 8, m: 16, l: 24, xl: 32 }
}
