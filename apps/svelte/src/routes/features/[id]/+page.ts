import { FeatureService } from '@feature-toggles/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => ({
  feature: params.id === 'new' ? null : await FeatureService.get(params.id),
});
