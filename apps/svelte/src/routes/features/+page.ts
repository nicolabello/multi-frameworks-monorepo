import { FeaturesService } from '@feature-toggles/helpers';
import type { PageLoad } from './$types';

// `load` runs before the page renders; what it returns becomes the page's `data` prop.
// https://svelte.dev/docs/kit/load
export const load: PageLoad = async () => ({ features: await FeaturesService.getAll() });
