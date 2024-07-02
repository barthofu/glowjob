export const randomColorFromString = (str: string) => {
	let hash = 0
	str.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let colour = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		colour += value.toString(16).padStart(2, '0')
	}
	return colour
}

export const pickNRandomElementsFromArray = <T>(arr: T[], n: number) => {
	const shuffled = arr.sort(() => 0.5 - Math.random())
	return shuffled.slice(0, n)
}
