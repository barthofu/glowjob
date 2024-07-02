export const styles = {
	global: (props: any) => ({
		body: {
			padding: 0,
			margin: 0,
			backgroundColor: 'primary.100',
			color: 'secondary.50',
		},

		table: {
			fontSize: 'xs',
		},

		'.not-striped tr:nth-of-type(odd) td': {
			background: 'transparent !important',
		},

		'option': {
			background: 'primary.100 !important'
		},

		/**
		 * Resets
		 */

		'*': {
			margin: 0,
			padding: 0,
			boxSizing: 'border-box',
		},

		a: {
			color: 'inherit',
			textDecoration: 'none',
		},

		'::-webkit-scrollbar': {
			width: '5px',
			height: '5px',
		},
		'::-webkit-scrollbar-thumb': {
			borderRadius: '10px',
			background: 'gray.700',
		},
		'::-webkit-scrollbar-track': {
			background: 'rgba(0, 0, 0, 0)',
		},
	}),
}
