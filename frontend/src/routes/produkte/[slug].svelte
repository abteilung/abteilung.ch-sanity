<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';;
  import { blocksToText } from '$lib/utils/blocksToText';

  export const load: Load = async ({ url, params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`/produkte/${slug}.json`);

		if (res.ok) {
      const { title, bio, mainImage, slug } = await res.json() as Post;

			return {
				props: {
          title,
          mainImage,
          slug,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/produkte/${slug}.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import { PortableText } from '@portabletext/svelte';
  import type { CustomBlockComponents, CustomSpanComponents } from 'sveltekit-pote';

  import FigureBlock from '$lib/components/content/FigureBlock.svelte';
  import HighlightMark from '$lib/components/content/HighlightMark.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
  };
  const customSpanComponents: CustomSpanComponents = {
    highlight: HighlightMark,
  };

  export let title: string;
  export let slug: string;
  export let mainImage: ImageProps;
  export let blocks: Sanity.Schema.BlockContent;

  let url: string;
  $: url = `https://abteilung.ch/produkte/${slug}`;
</script>

<div class="mb-4 sm:mb-24">
  <div>

    <h1 class="font-serif text-3xl font-semibold tracking-tight text-gray-800 title md:text-5xl dark:text-gray-200">
      {name}
    </h1>

  </div>
  <article class="mt-4 w-full">
    <PortableText blocks={[blocks]} {customBlockComponents} {customSpanComponents} />
  </article>
</div>
