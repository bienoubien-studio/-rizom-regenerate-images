import { regenerateImageSizes } from '$lib/index.js';
import type { Config } from 'rizom';
import { collection } from 'rizom';
import { text } from 'rizom/fields';

const Pages = collection('pages', {
	group: 'content',
	fields: [text('title').isTitle()]
});

const config: Config = {
	database: 'regenerate-images.sqlite',
	collections: [Pages],
	areas: [],
	plugins: [regenerateImageSizes()]
};
export default config;
