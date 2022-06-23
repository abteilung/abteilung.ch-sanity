<script lang="ts">
  import SanityImage from "./SanityImage.svelte";

  export let title: string;
  export let slug: string;
  export let image: ImageProps;
</script>

<li class="flex items-center space-x-2">
  <SanityImage image={image} loading="eager" imageClass="" />
  <div>
    <a href="/produkt/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
      {title}
    </a>
  </div>
</li>
