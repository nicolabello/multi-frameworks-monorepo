import { FeatureService, FeaturesService } from '@feature-toggles/helpers';
import { redirect, type RouteObject } from 'react-router';
import Feature from './components/Feature.tsx';
import Features from './components/Features.tsx';

// React Router "data mode": routes are plain objects with a `loader` that fetches data *before* the route
// renders (no loading spinners or effects in components). `request.signal` aborts the call if the user
// navigates away first. https://reactrouter.com/start/modes and https://reactrouter.com/start/data/data-loading
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
    // Catch-all: anything else redirects to the list. https://reactrouter.com/api/utils/redirect
    path: '*',
    loader: () => redirect('/features'),
  },
];
