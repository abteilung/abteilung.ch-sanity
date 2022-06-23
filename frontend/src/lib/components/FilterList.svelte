<script lang="ts">
  type T = $$Generic;

	export let items: Array<T>;
	export let emptyMessage: string = "List empty!";
</script>

<slot name="title" />

<div class="grid md:grid-cols-2 gap-8">
  {#each items as item}
    <slot name="item" {item} />
  {:else}
    <div>
      {emptyMessage}
    </div>
  {/each}
</div>
