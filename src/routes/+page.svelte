<script lang="ts">
    import { Button } from '$lib/components/ui/button'; 
    import { base } from '$app/paths';
    import { Github } from 'lucide-svelte';
</script>

<main >
    <div class="flex min-h-screen flex-col justify-center max-w-2xl mx-auto p-6 space-y-8"> 
		
        <div class="text-center space-y-4">
            <h1 class="mb-0 text-6xl font-bold b  bg-clip-text">
                [NEO] Interactive CYOA Creator
            </h1>
            <h6 class="text-gray-500 font-medium">
                Created by MeanDelay / Recreated by SGVsbG8gd29ybGQh
            </h6>
        </div>
 
        <div class="my-8 flex flex-col gap-y-3">
            <Button 
                href="{base}/creator"
                class="bg-gray-200 text-gray-800 font-medium py-3 rounded-lg shadow-md hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
                Open Image-CYOA Creator
            </Button>
            <Button 
                href="{base}/viewer"
                class="bg-gray-200 text-gray-800 font-medium py-3 rounded-lg shadow-md hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
                Open Image-CYOA Viewer
            </Button>
            <Button 
                href="{base}/help"
                class="bg-gray-200 text-gray-800 font-medium py-3 rounded-lg shadow-md hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
                Help And Instructions
            </Button>
        </div>
 
        <div class="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 text-gray-700">
            <p class="leading-relaxed">
                This is an open-source version of the original Interactive CYOA Creator, completely rewritten in Svelte.
                The new version runs significantly faster, especially with large projects,
                while maintaining full compatibility with ICC and partially with ICC+ files.
            </p>
        </div>
 
        <div class="space-y-6">
            <div class="flex justify-end">
                <span class="text-sm text-gray-500 bg-white/70 px-3 py-1 rounded-full">
                    Update: 28.02.2025
                </span>
            </div>

            <div class="space-y-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 class="font-semibold text-lg text-emerald-600">What's New:</h3>
                <ul class="space-y-3 text-gray-700">
                    <li class="flex items-center">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                        Added background image support for activated cards
                    </li>
                    <li class="flex items-center">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                        Minor design correction
                    </li>
                    <li class="flex items-center">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                        Reverse-engineered ICC source code
                    </li>
                </ul>
            </div>
 
            <div class="flex justify-center pt-4">
                <a 
                    href="https://github.com/sgvsbg8gv29ybgqk/neoicc"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Github class="w-5 h-5 mr-2" />
                    Open on GitHub
                </a>
            </div>
        </div>
    </div>
</main>