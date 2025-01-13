import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; 

function removeDevCode(content) {
    content = content.replace(/\/\/ @dev-only\s*\n.*?\n}/gs, '');
    content = content.replace(/<!--\s*@dev-only\s*-->\s*<div[\s\S]*?<\/div>\s*(?={:else|{#|\n\s*$)/g, '');
    
    return content;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        vitePreprocess(),
        {
            markup: ({ content, filename }) => {
                if (process.env.BUILD_TYPE === 'viewer') {
                    const processedContent = removeDevCode(content);
                    return {
                        code: processedContent
                    };
                }
                return { code: content };
            },
            
            script: ({ content, filename }) => {
                if (process.env.BUILD_TYPE === 'viewer') {
                    const processedContent = removeDevCode(content);
                    return {
                        code: processedContent
                    };
                }
                return { code: content };
            }
        }
    ],

    kit: { 
        paths: {
            base: process.env.BASE_PATH || '',
            relative: true
        },
        
        adapter: adapter({
            pages: process.env.BUILD_TYPE === 'viewer' ? 'build-viewer' : 'build',
            assets: process.env.BUILD_TYPE === 'viewer' ? 'build-viewer' : 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        })
    }
};

export default config;
