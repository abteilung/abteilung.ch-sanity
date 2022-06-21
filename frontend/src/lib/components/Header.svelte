<script lang="ts">
  import Toggle from '$lib/components/DarkModeToggle.svelte';
  import { page } from '$app/stores';
  import Arrow from '@svicons/remix-line/arrow-left.svelte';

  $: currentPath = $page.path.substr(0, $page.path.lastIndexOf('/')) || $page.path;
</script>

<div class="flex flex-row justify-between w-full py-1 sm:py-4 items-center">
  <nav class="flex flex-row space-x-4">
    {#if currentPath !== '/'}
     <div class="text-lg sm:text-base">
        <a href="/" sveltekit:prefetch class="transition-shadow shadow-thin hover:shadow-thick ring-green-500 dark:ring-opacity-40 ring-opacity-25">
          <Arrow class="inline" height="1rem"></Arrow>
          Back
        </a>
      </div>
    {/if}
  </nav>
  <div class="no-js-hidden">
    <Toggle />
  </div>
</div>
