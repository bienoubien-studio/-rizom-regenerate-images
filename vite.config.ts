import { sveltekit } from '@sveltejs/kit/vite';
import { rizom } from 'rizom/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [rizom(), sveltekit()]
});
