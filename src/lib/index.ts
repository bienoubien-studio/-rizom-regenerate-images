import { json, type RequestEvent } from '@sveltejs/kit';
import type { Plugin } from 'rizom/types';
import { config as configUtil } from 'rizom/util';
import HeaderButton from './HeaderButton.svelte';

type GenericDoc = { id: string; filename: string; mimeType: string; [x: string]: any };

export const regenerateImages: Plugin<never> = () => {
	const regenerate = async (event: RequestEvent) => {
		// get params
		const params = event.url.searchParams;
		const slug = params.get('slug');
		const id = params.get('id');
		if (!slug) {
			throw new Error('missing slug param');
		}
		// check if it's a collection
		const isCollection = event.locals.rizom.config.isCollection(slug);
		if (!isCollection) {
			throw new Error(`${slug} is not a collection`);
		}
		// get the related collection api
		const collectionAPI = event.locals.rizom.collection(slug);

		// check if it's an upload collection
		const config = collectionAPI.config;
		if (!configUtil.isUploadConfig(config)) {
			throw new Error(`${slug} is not an upload collection`);
		}

		let documents;
		if (!id) {
			// no id provided get all documents
			documents = await collectionAPI.find({});
		} else {
			// if id provided process only one document
			const document = await collectionAPI.findById({ id });
			documents = [document];
		}

		let processed = 0;

		const processImage = async (document: any) => {
			// check if document is an image
			if (document.mimeType.includes('image')) {
				try {
					console.log(`process ${document.filename} - ${document.id}`);
					// Get the image
					await fetch(`${process.env.PUBLIC_RIZOM_URL}/medias/${document.filename}`)
						.then((response) => response.blob())
						.then(async (blob) => {
							// convert the response to a file object
							const file = new File([blob], document.filename, { type: blob.type });
							// add it to the data
							const data: Partial<GenericDoc> = {
								file
							};
							// Update the document with its own file so file are regenerated
							await collectionAPI.updateById({
								data,
								id: document.id
							});
							// count
							processed += 1;
						});
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log(`skip ${document.filename} - ${document.id} : not an image`);
			}
		};

		await Promise.all(documents.map((doc) => processImage(doc)));

		return json({ message: `${processed}/${documents.length} documents regenerated` });
	};

	return {
		name: 'regenerateImages',

		configure: (config) => {
			config = {
				...config,
				panel: {
					...(config.panel || {}),
					components: {
						...(config.panel.components || { header: [], collectionHeader: [] }),
						collectionHeader: [...(config.panel.components?.collectionHeader || []), HeaderButton]
					}
				}
			};
			return config;
		},

		routes: {
			'/api/regenerate_images': {
				POST: regenerate
			}
		}
	};
};
