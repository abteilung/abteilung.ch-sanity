<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';;
  import { blocksToText } from '$lib/utils/blocksToText';
  
  export const load: Load = async ({ url, params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`/agentur/${slug}.json`);
    
		if (res.ok) {
      const { name, bio, image, slug } = await res.json() as Author;
      
			return {
        props: {
          name,
          bio,
          image,
          slug,
          blocks: bio,
				}
			};
		}
    
		return {
      status: res.status,
			error: new Error(`Could not load '/agentur/${slug}.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import SanityImage from "$lib/components/SanityImage.svelte";
  import Link from '$lib/Link.svelte'

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

  export let name: string;
  export let slug: string;
  export let image: ImageProps;
  export let bio: Sanity.Schema.BlockContent;
  export let blocks: Sanity.Schema.BlockContent;

  let url: string;
  $: url = `https://abteilung.ch/agentur/${slug}`;
</script>

<div class="mb-4 sm:mb-24">
  <div>

    <h1 class="font-serif text-3xl font-semibold tracking-tight text-gray-800 title md:text-5xl dark:text-gray-200">
      {name}
    </h1>

  </div>
  <article class="mt-4 w-full">

    <SanityImage {image} loading="eager" imageClass="card-image group-hover:scale-105 duration-300" />

    <PortableText
      value={bio}
      components={{
        types: {
          image: SanityImage,
        },
        marks: {
          link: Link
        }
      }}
    />    

  </article>
</div>
