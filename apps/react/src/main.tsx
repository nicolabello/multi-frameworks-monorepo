import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes.tsx';
import './index.css';

// Uses the browser history API for clean URLs: https://reactrouter.com/api/data-routers/createBrowserRouter
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  // StrictMode runs extra development-only checks (e.g. double-invoked effects): https://react.dev/reference/react/StrictMode
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
