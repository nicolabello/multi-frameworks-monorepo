import { redirect } from '@sveltejs/kit';

// SvelteKit uses file-system routing: this file handles `/`. https://svelte.dev/docs/kit/routing
// `redirect` throws, which stops loading this page and navigates to the list. https://svelte.dev/docs/kit/load#Redirects
export const load = () => redirect(307, '/features');
