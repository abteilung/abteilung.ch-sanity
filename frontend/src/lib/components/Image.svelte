<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { inview } from 'svelte-inview';

  export const lazyLoad = true;

	export let src: string;
	export let alt: string;
	export let srcset: string = null;
	export let sizes: string = null;

	export let width: number = null;
	export let height: number = null;
	export let placeholder: string = null;

  let inView = false;
  let nativeLoading = false

  let imageElement: HTMLImageElement;

  // Determine whether to bypass our intersecting check
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true
    }
  });

  const inviewOptions = {
    rootMargin: '50px',
    unobserveOnEnter: true,
  };

  const handleChange = (event: Event) => {
    // FIXME: Use proper types, relies on https://github.com/maciekgrzybek/svelte-inview/issues/5
    // Hack to recast as a custom event to include detail
    const { detail } = (event as CustomEvent<{ inView: boolean, entry: IntersectionObserverEntry }>);
    inView = detail.inView;

    if(imageElement) {
      imageElement.src = src;
    }
  };
</script>

<div class="relative overflow-hidden" use:inview={inviewOptions} on:change={handleChange}>
  {#if nativeLoading}
    <img class="!my-0 mx-auto no-js-hidden" {width} {height} loading="lazy" {src} {srcset} {sizes} {alt}/>
  {:else}
    <img bind:this={imageElement} src="" {width} {height} class="!my-0 mx-auto no-js-hidden" {srcset} {sizes} {alt}>
  {/if}

  {#if !inView}
    <img out:fade {width} {height} class="no-js-hidden blur mx-auto absolute inset-0 !my-0 scale-105" src={placeholder} {alt}>
  {/if}
  
  <!-- TODO: This is probably janky and broken with no js, will probs need the no js styling stuff -->
  <noscript>
    <img {src} {srcset} {sizes} {alt} class="!my-0 mx-auto" />
  </noscript>
</div>
