<script lang="ts">
  import Arrow from '@svicons/remix-line/arrow-right-s.svelte';

  export let title: string;
  export let description: string;
  export let slug : string;
  export let categories : string[];
</script>

<li class="flex items-start space-x-2 mb-4">
  <div class="py-1.5">
    <Arrow height="1rem"></Arrow>
  </div>
  <div class="flex flex-col sm:flex-row sm:space-x-2 md:space-x-6">
    <div class="flex-shrink-0">
      <a href="/projects/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
        {title}
      </a>
      <div class="space-x-2">
        {#each categories as name}
          <span class="py-0.5 px-1 text-xs font-semibold text-gray-100 bg-gray-500 dark:(bg-gray-700 text-gray-300) rounded">{name}</span>
        {/each}
      </div>
    </div>
    <div class="mt-0.5">
      <p class="font-light">
        <span class="inline mr-2">
          {description}
        </span>
        <a href="/projects/{slug}" sveltekit:prefetch class="inline-block text-xs text-green-700 dark:text-green-100 hover:underline uppercase font-bold tracking-wide">
          Read More...
        </a>
      </p>
    </div>
  </div>
</li>
