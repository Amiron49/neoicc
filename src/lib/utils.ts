import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toBlob } from 'html-to-image';
import { app } from './store/store.svelte';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function printDiv(div: HTMLElement) {
	if (!div) return;
	if (app.styling.backgroundImage) {
		div.style.backgroundImage = `url(${app.styling.backgroundImage})`;
		div.style.backgroundRepeat = 'repeat';
	}
	try {
		const blob = await toBlob(div, {
			backgroundColor: app.styling.backgroundImage ? undefined : app.styling.backgroundColor,
			type: 'image/webp',
			quality: 0.9,
			filter: (node) =>
				node.nodeType !== Node.ELEMENT_NODE || !node.hasAttribute('data-html2canvas-ignore')
		});
		if (!blob) return;
		const btn = document.createElement('a');
		btn.download = 'Finalized_Build.webp';
		btn.href = window.URL.createObjectURL(blob);
		btn.dataset.downloadurl = ['image/webp', btn.download, btn.href].join(':');
		btn.click();
		window.URL.revokeObjectURL(btn.href);
		if (app.styling.backgroundImage) {
			div.removeAttribute('style');
		}
	} catch (error) {
		console.log('Fail to generate image, Segmenting and recreating the image...', error);
		const maxLength = 6e6;
		const container: HTMLElement = div.cloneNode(true) as HTMLElement;

		console.log(container.innerHTML.length);

		function splitNodes(node: HTMLElement, maxLength: number) {
			const parts = [];
			let currentPart = document.createElement('div');
			currentPart.style.cssText = node.style.cssText;
			let currentLength = 0;

			function addNodeToCurrentPart(node: Node) {
				const clone = node.cloneNode(true);
				currentPart.appendChild(clone);
				currentLength += new XMLSerializer().serializeToString(node).length;
			}

			Array.from(node.childNodes).forEach(function (child) {
				const childLength = new XMLSerializer().serializeToString(child).length;
				if (currentLength + childLength > maxLength) {
					parts.push(currentPart.innerHTML);
					currentPart = document.createElement('div');
					currentPart.style.cssText = node.style.cssText;
					currentLength = 0;
				}
				addNodeToCurrentPart(child);
			});

			if (currentPart.innerHTML) {
				parts.push(currentPart.innerHTML);
			}

			return parts;
		}

		const parts = splitNodes(container, maxLength);

		if (parts.length > 1) {
			for (let i = 0; i < parts.length; i++) {
				const part = parts[i];
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = part;
				div.appendChild(tempDiv);
				try {
					const blob = await toBlob(tempDiv, {
						backgroundColor: app.styling.backgroundImage ? undefined : app.styling.backgroundColor,
						type: 'image/webp',
						quality: 0.9,
						filter: (node) =>
							node.nodeType !== Node.ELEMENT_NODE || !node.hasAttribute('data-html2canvas-ignore')
					});
					if (!blob) return;
					console.log(blob);
					const btn = document.createElement('a');
					btn.download = 'Finalized_Build_Part_' + (i + 1) + '.webp';
					btn.href = window.URL.createObjectURL(blob);
					btn.dataset.downloadurl = ['image/webp', btn.download, btn.href].join(':');
					btn.click();
					window.URL.revokeObjectURL(btn.href);
				} catch (error) {
					console.log('Fail to generate image', error);
				} finally {
					div.removeChild(tempDiv);
					if (app.styling.backgroundImage) {
						div.removeAttribute('style');
					}
				}
			}
		}
	}
}

export function base64ToBlob(base64: string, mime: string) {
	mime = mime || '';
	const sliceSize = 1024;
	const byteChars = window.atob(base64);
	const byteArrays = [];

	for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
		const slice = byteChars.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: mime });
}
