<script lang="ts">
  import '../app.css';
  import type { LayoutProps } from './$types';

  // A layout wraps every page below it; the current page is passed as the `children` snippet.
  // https://svelte.dev/docs/kit/routing#layout
  let { children }: LayoutProps = $props();
</script>

{@render children()}
