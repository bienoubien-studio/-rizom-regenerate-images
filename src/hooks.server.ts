import { sequence } from '@sveltejs/kit/hooks';
import { handlers } from 'rizom';
import config from './config/rizom.config.js';
import * as schema from './lib/server/schema.js';

export const handle = sequence(...handlers({ config, schema }));
