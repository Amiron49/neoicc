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

export function generateID(): string {
	return window.crypto.randomUUID().replace(/-/g, '');
}
