<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/story.json');

		if (res) {
			return {
				props: {
					posts: await res.json()
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
  import PostListItem from '$lib/components/PostListItem.svelte';
  import FilterList from '$lib/components/FilterList.svelte';

  export let posts: Post[];
</script>

<div class="mb-12 sm:mb-24">
  <FilterList items={posts} let:item>
    <h2 slot="title" id="posts" class="text-xl flex items-center space-x-2">
      <a href="/story" sveltekit:prefetch class="hover:underline">
        Stories
      </a>
    </h2>
    <PostListItem slot="item" title={item.title} slug={item.slug} date={item.publishedAt} image={item.mainImage} />
  </FilterList>
</div>
