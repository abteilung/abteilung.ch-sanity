<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';;
  import { getReadingTime } from '$lib/utils/getReadingTime';
  import { blocksToText } from '$lib/utils/blocksToText';

  export const load: Load = async ({ url, params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`/stories/${slug}.json`);

		if (res.ok) {
      const { title, body, subtitle, mainImage, publishedAt, slug } = await res.json() as Post;

			return {
				props: {
          title,
          subtitle, 
          mainImage,
          publishedAt,
          slug,
          blocks: body,
          readingTime: getReadingTime(blocksToText(body))
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/stories.json'`)
		};
  }
</script>

<script lang="ts">
  import SanityImage from "./SanityImage.svelte";
  import SEO from "svelte-seo";
  import { PortableText } from '@portabletext/svelte';
  import type { CustomBlockComponents, CustomSpanComponents } from 'sveltekit-pote';

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
  $: url = `https://abteilung.ch/stories/${slug}`;
</script>

<SEO title="{title} | Paul Lavender-Jones"></SEO>

<div class="mb-4 sm:mb-24">
  <div>
    <SanityImage {mainImage} loading="eager" />

  </div>
  <div>
    <p class="text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-green-200 dark:text-opacity-70 md:text-sm">
      {publishedAt}
    </p>
    <h1 class="font-serif text-3xl font-semibold tracking-tight text-gray-800 title md:text-5xl dark:text-gray-200">
      {title}
    </h1>
    <div class="mt-2 leading-normal text-gray-900 sm:mt-4 md:text-xl font-extralight dark:text-gray-200">
      {subtitle}
    </div>
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
  <article class="mt-4 w-full prose sm:prose max-w-85ch sm:mt-12 dark:prose-dark prose-green">
    <PortableText blocks={[blocks]} {customBlockComponents} {customSpanComponents} />
  </article>
</div>
