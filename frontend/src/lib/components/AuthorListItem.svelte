<script lang="ts">
  import SanityImage from "./SanityImage.svelte";

  export let name: string;
  export let slug: string;
  export let image: ImageProps;
</script>

<li class="flex items-center space-x-2">
  <SanityImage image={image} loading="eager" imageClass="" />
  <div>
    <a href="/agentur/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
      {name}
    </a>
  </div>
</li>
