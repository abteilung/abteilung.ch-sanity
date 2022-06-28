<script lang="ts">
  import SanityImage from "./SanityImage.svelte";

  export let name: string;
  export let slug: string;
  export let image: ImageProps;
</script>

<li class="bg-white shadow-xl">
  <a href="/agentur/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
    <SanityImage image={image} loading="eager" imageClass="" />
    {name}
  </a>
</li>
