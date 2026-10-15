import { redirect } from '@sveltejs/kit';

// `[...rest]` is a rest parameter matching any other path: https://svelte.dev/docs/kit/advanced-routing#Rest-parameters
export const load = () => redirect(307, '/features');
