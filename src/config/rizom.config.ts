import { regenerateImages } from '$lib/index.js';
import { defineConfig } from 'rizom';
import { collection } from 'rizom';
import { text } from 'rizom/fields';

const Pages = collection('pages', {
	group: 'content',
	fields: [text('title').isTitle()]
});

const config = defineConfig({
	database: 'regenerate-images.sqlite',
	collections: [Pages],
	areas: [],
	plugins: [regenerateImages()]
});

export default config;
