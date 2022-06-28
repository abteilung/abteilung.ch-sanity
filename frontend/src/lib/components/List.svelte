<script lang="ts">
  type T = $$Generic;

	export let items: Array<T>;
	export let emptyMessage: string = "List empty!";
  export let listClass: string
</script>

<slot name="title" />

<ul class={listClass}>
  {#each items as item}
    <slot name="item" {item} />
  {:else}
    <li>
      {emptyMessage}
    </li>
  {/each}
</ul>
