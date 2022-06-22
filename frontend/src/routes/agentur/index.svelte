<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/agentur.json');

		if (res) {
			return {
				props: {
					authors: await res.json()
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
    import SEO from "svelte-seo";
    import List from '$lib/components/List.svelte';
    import AuthorListItem from '$lib/components/AuthorListItem.svelte';
  
    export let authors: Author[];
</script>
  
<SEO title="Agentur | Abteilung.ch" description="Some of my thoughts and writings"></SEO>

<h1>Agentur</h1>


<div class="mb-12 sm:mb-24">
    <List items={authors} let:item>
      <h2 slot="title" id="posts" class="font-serif text-xl flex items-center space-x-2">
        <a href="/stories" sveltekit:prefetch class="hover:underline">
          Stories
        </a>
      </h2>
      <AuthorListItem slot="item" name={item.name} slug={item.slug} image={item.image} />
    </List>
  </div>
  