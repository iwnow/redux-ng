
export const getStringHashCode = (s: string) => {
	let hash = 0, i, chr;
	if (!s || s.length === 0) return hash;
	const len = s.length;
	for (i = 0; i < len; i++) {
		chr = s.charCodeAt(i);
		// tslint:disable-next-line:no-bitwise
		hash = ((hash << 5) - hash) + chr;
		// tslint:disable-next-line:no-bitwise
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}
