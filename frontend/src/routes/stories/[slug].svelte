<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';;
  import { getReadingTime } from '$lib/utils/getReadingTime';
  import { blocksToText } from '$lib/utils/blocksToText';

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params;
    const res = await fetch(`/posts/${slug}.json`);

		if (res.ok) {
      const { title, body, description, publishedAt, slug } = await res.json() as Post;

			return {
				props: {
          title,
          description,
          publishedAt,
          slug,
          blocks: body,
          readingTime: getReadingTime(blocksToText(body))
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/posts.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import { PortableText } from 'svelte-pote';
  import type { CustomBlockComponents, CustomSpanComponents } from 'svelte-pote';

  import FigureBlock from '$lib/components/content/FigureBlock.svelte';
  import CodeBlock from '$lib/components/content/CodeBlock.svelte';
  import HighlightMark from '$lib/components/content/HighlightMark.svelte';

  import EmailShare from '$lib/components/share/EmailShare.svelte';
  import LinkedInShare from '$lib/components/share/LinkedInShare.svelte';
  import FacebookShare from '$lib/components/share/FacebookShare.svelte';
  import WhatsAppShare from '$lib/components/share/WhatsAppShare.svelte';
  import TwitterShare from '$lib/components/share/TwitterShare.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
    code: CodeBlock,
  };
  const customSpanComponents: CustomSpanComponents = {
    highlight: HighlightMark,
  };

  export let title: string;
  export let slug: string;
  export let description: string;
  export let publishedAt: string;
  export let readingTime: string;
  export let blocks: Sanity.Schema.BlockContent;

  let url: string;
  $: url = `https://paullj.me/posts/${slug}`;
</script>

<SEO title="{title} | Paul Lavender-Jones" {description}></SEO>

<div class="mb-4 sm:mb-24">
  <div>
    <p class="text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-green-200 dark:text-opacity-70 md:text-sm">
      {publishedAt}
    </p>
    <h1 class="font-serif text-3xl font-semibold tracking-tight text-gray-800 title md:text-5xl dark:text-gray-200">
      {title}
    </h1>
    <div class="mt-2 leading-normal text-gray-900 sm:mt-4 md:text-xl font-extralight dark:text-gray-200">
      {description}
    </div>
  </div>
  <div class="mt-4 flex space-x-2 sm:space-x-4 items-center">
    <p class="text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
      Share via
    </p>
    <EmailShare subject="'{title}' on paullj.me" body="Read this post at {url}" />
    <LinkedInShare {url} />
    <FacebookShare {url} />
    <TwitterShare text="Read this post at {url}" {url} />
    <WhatsAppShare text="Read this post at {url}" />
    <span class="text-gray-400">
      &middot;
    </span>
    <p class="ml-8 text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
      {readingTime} minute read
    </p>
  </div>
  <article class="mt-4 w-full prose sm:prose max-w-85ch sm:mt-12 dark:prose-dark prose-green">
    <PortableText {blocks} {customBlockComponents} {customSpanComponents} />
  </article>
</div>
