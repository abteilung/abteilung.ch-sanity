<script lang="ts">
  import { page } from '$app/stores';

  $: currentPath = $page.url.pathname.substr(0, $page.url.pathname.lastIndexOf('/')) || $page.url.pathname;
</script>

<header class="flex flex-row justify-between w-full py-1 sm:py-4 items-center">
  <nav class="flex flex-row space-x-4">
    {#if currentPath !== '/'}
     <div class="text-lg sm:text-base">
        <a href="/" sveltekit:prefetch class="transition-shadow shadow-thin hover:shadow-thick ring-green-500 dark:ring-opacity-40 ring-opacity-25">
          Back
        </a>
      </div>
    {/if}
  </nav>
</header>


<style lang="postcss">
  header {
    @apply bg-white;
  }
</style>