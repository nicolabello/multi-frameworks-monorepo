import { FeatureService, FeaturesService } from '@feature-toggles/helpers';
import { redirect, type RouteObject } from 'react-router';
import Feature from './components/Feature.tsx';
import Features from './components/Features.tsx';

// Loaders fetch data before the route renders; `request.signal` aborts the call if the user navigates away.
export const routes: RouteObject[] = [
  {
    path: '/features',
    Component: Features,
    loader: ({ request }) => FeaturesService.getAll({ signal: request.signal }),
  },
  {
    path: '/features/:id',
    Component: Feature,
    loader: ({ params, request }) =>
      params.id === 'new' ? null : FeatureService.get(params.id!, { signal: request.signal }),
  },
  {
    path: '*',
    loader: () => redirect('/features'),
  },
];
