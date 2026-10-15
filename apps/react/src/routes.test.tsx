import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { routes } from './routes.tsx';

vi.mock('@feature-toggles/helpers', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@feature-toggles/helpers')>()),
  FeaturesService: {
    getAll: async () => [{ _id: '1', key: 'darkMode', description: '', type: 'boolean', value: true }],
  },
}));

describe('routes', () => {
  it('redirects to the features list and renders it', async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'] })} />);

    expect(await screen.findByRole('heading', { name: 'Feature toggles' })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /darkMode/ })).toHaveAttribute('href', '/features/1');
  });
});
