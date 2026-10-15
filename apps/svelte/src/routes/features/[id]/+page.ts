import { FeatureService } from '@feature-toggles/helpers';
import type { PageLoad } from './$types';

// `[id]` in the folder name is a route parameter, available as `params.id`. https://svelte.dev/docs/kit/routing#page
export const load: PageLoad = async ({ params }) => ({
  feature: params.id === 'new' ? null : await FeatureService.get(params.id),
});
