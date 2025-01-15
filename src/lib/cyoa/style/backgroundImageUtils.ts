import { writable } from 'svelte/store';

// New array to store multiple background images
export const backgroundImages = writable<string[]>([]);

// Function to create a seeded random number generator
function seededRandom(seed: string) {
    const x = Math.sin(seed.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0)) * 10000;
    return x - Math.floor(x);
}

// Function to select a background image using the object's id as a seed
export function getRandomBackgroundImage(images: string[], objectId: string): string {
    if (images.length === 0) return '';
    const randomIndex = Math.floor(seededRandom(objectId) * images.length);
    return images[randomIndex];
}
