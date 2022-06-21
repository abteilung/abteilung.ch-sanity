<script lang="ts">
  import Image from "./Image.svelte";

	export let title: string;
	export let slug: string;
	export let date: string;
	export let image: ImageProps;
</script>

<li class="flex items-center space-x-2">
  <time class="text-xs font-extrabold tracking-widest text-gray-600 uppercase sm:text-sm dark:text-gray-400">
    {date}
  </time>

  <Image {...image}></Image>
  <div>
    <a href="/stories/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
      {title}
    </a>
  </div>
</li>
