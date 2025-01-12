import { writable } from 'svelte/store';

// New array to store multiple background images
export const backgroundImages = writable<string[]>([]);

// Function to randomly select a background image
export function getRandomBackgroundImage(images: string[]): string {
    if (images.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}
