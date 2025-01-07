export function pi(el: unknown): number {
	if (typeof el === 'string') return parseInt(el as string);
	return el as number;
}

export function getImageURL(image: string, imagePrefix: string): string {
	if (image.length > 100) {
		// most likely a base64 image
		return image;
	}
	const res = `${imagePrefix}${image}`;
	return res;
}

export function generateID(length = 4): string {
	let id = '';
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	for (let o = 0; o < length; o++) id += charset.charAt(Math.floor(Math.random() * charset.length));
	return id;
}
