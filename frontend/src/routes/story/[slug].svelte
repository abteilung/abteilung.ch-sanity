<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';;
  import type { QueryResult } from './[slug].json';

  export const load: Load = async ({ url, params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`/story/${slug}.json`);

		if (res.ok) {
      const story = await res.json() as QueryResult;

			return {
				props: {
          ...story,
          blocks: story.body,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/story.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import { PortableText } from '@portabletext/svelte';
  import type { CustomBlockComponents, CustomSpanComponents } from 'sveltekit-pote';
  
  import SanityImage from "$lib/components/SanityImage.svelte";
  import FigureBlock from '$lib/components/content/FigureBlock.svelte';
  import CodeBlock from '$lib/components/content/CodeBlock.svelte';
  import HighlightMark from '$lib/components/content/HighlightMark.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
    code: CodeBlock,
  };
  const customSpanComponents: CustomSpanComponents = {
    highlight: HighlightMark,
  };

  export let title: string;
  export let slug: string;
  export let subtitle: string;
  export let publishedAt: string;
  export let readingTime: string;
  export let mainImage: ImageProps;
  export let blocks: Sanity.Schema.BlockContent;

  let url: string;
  $: url = `https://abteilung.ch/story/${slug}`;
</script>

<SEO title="{title} | Paul Lavender-Jones"></SEO>

<div class="container bg-primary h-[800px] overflow-hidden">
  <SanityImage image={mainImage} loading="eager" imageClass="bg-cover w-full bg-center" />
</div>
  <div>

  </div>
  <div>
    <p class="text-xs">
      {publishedAt}
    </p>
    <h4>
      {subtitle}
    </h4>
    <h1 class="text-xl">
      {title}
    </h1>
  </div>
  <div class="mt-4 flex space-x-2 sm:space-x-4 items-center">
    <p class="text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
      Share via
    </p>
    <span class="text-gray-400">
      &middot;
    </span>
    <p class="ml-8 text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
      {readingTime} minute read
    </p>
  </div>
  <article class="mt-4 w-full">
    <PortableText {blocks} {customBlockComponents} {customSpanComponents} />
  </article>
