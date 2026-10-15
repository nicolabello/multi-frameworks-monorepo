import { FeaturesService } from '@feature-toggles/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => ({ features: await FeaturesService.getAll() });
