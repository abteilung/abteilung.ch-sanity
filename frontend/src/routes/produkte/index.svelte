<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/produkte.json');

		if (res) {
			return {
				props: {
					produkte: await res.json()
				}
			};
		}

    return {
      status: res.status,
      error: new Error(`Could not load '/produkte.json'`)
    };
  }
</script>


<script lang="ts">
  import List from '$lib/components/List.svelte';
  import ProductListItem from '$lib/components/ProductListItem.svelte';
  export let produkte;
</script>
  

<List items={produkte} let:item>
  <h2 slot="title" id="posts" class="text-xl flex items-center space-x-2">
    <a href="/stories" sveltekit:prefetch class="hover:underline">
      Produkte
    </a>
  </h2>
  <ProductListItem slot="item" title={item.subtitle} slug={item.slug} image={item.productIcon} />
</List>