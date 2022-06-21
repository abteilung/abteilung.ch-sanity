<script lang="ts">
  type T = $$Generic;

	export let items: Array<T>;
	export let emptyMessage: string = "List empty!";
</script>

<div>
  <slot name="title" />

  <div class="grid grid-cols-1 gap-2 overflow-hidden sm:grid-cols-3">
    {#each items as item}
      <div class="w-full overflow-hidden">
        <slot name="item" {item} />
      </div>
    {:else}
      {emptyMessage}
    {/each}
  </div>
</div>
