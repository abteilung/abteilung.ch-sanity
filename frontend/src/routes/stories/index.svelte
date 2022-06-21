<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/stories.json');

		if (res) {
			return {
				props: {
					posts: await res.json()
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
  import PostListItem from '$lib/components/PostListItem.svelte';
  import List from '$lib/components/List.svelte';

  export let posts: Post[];
</script>

<SEO title="Blog | Paul Lavender-Jones" description="Some of my thoughts and writings"></SEO>

<div class="mb-12 sm:mb-24">
  <List items={posts} let:item>
    <h2 slot="title" id="posts" class="font-serif text-xl flex items-center space-x-2">
      <a href="/stories" sveltekit:prefetch class="hover:underline">
        Stories
      </a>
    </h2>
    <PostListItem slot="item" title={item.title} slug={item.slug} date={item.publishedAt} image={item.mainImage} />
  </List>
</div>
