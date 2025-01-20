import { adapter as staticAdapter } from '@sveltejs/adapter-static';
import { adapter as autoAdapter } from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

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
        files: {
            routes: process.env.BUILD_TYPE === 'viewer' ? 'src/routes-viewer' : 'src/routes',
        },
        paths: {
            base: process.env.BASE_PATH || '',
            relative: true
        },
        
        adapter: process.env.ADAPTER === 'static' ? staticAdapter({
            pages: process.env.BUILD_TYPE === 'viewer' ? 'build-viewer' : 'build',
            assets: process.env.BUILD_TYPE === 'viewer' ? 'build-viewer' : 'build',
            fallback: undefined,
            precompress: false,
            strict: true,
            async writeAdapter(builder) {
                await builder.writeClient();
                await builder.writePrerendered();

                if (process.env.BUILD_TYPE === 'viewer') {
                    const viewerIndexPath = path.join(builder.getClientDirectory(), 'viewer', 'index.html');
                    const rootIndexPath = path.join(builder.getClientDirectory(), 'index.html');

                    if (fs.existsSync(viewerIndexPath)) {
                        fs.copyFileSync(viewerIndexPath, rootIndexPath);
                        console.log('Copied viewer/index.html to root index.html');
                    } else {
                        console.error('viewer/index.html not found');
                    }
                }
            }
        }) : autoAdapter()
    }
};

export default config;