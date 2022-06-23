<script lang="ts">
  import SanityImage from "./SanityImage.svelte";

	export let title: string;
	export let slug: string;
	export let image: ImageProps;
</script>

<div class="card group">
  <a href="/story/{slug}" sveltekit:prefetch>
    <div class="card-content">
      {title}
      <div class="card-button"><div class="icon">x</div></div>
    </div>
    <SanityImage {image} loading="eager" imageClass="card-image group-hover:scale-105 duration-300" />
  </a>
</div>


<style lang="postcss">
  .card {
    @apply relative overflow-hidden isolate cursor-pointer aspect-video;
  } 
  .card-content {
    @apply absolute bg-black bg-opacity-70 text-white bottom-0 left-0 py-4 pl-4 pr-12 z-10 w-2/3 text-lg;
  }
  .card-image {
    @apply object-cover h-full object-center scale-100 transition-all;
  }
  .card-button {
    @apply absolute translate-x-1/2 right-0 bottom-0 w-16 h-16 bg-gradient-to-tl from-primary to-secondary flex justify-center items-center group-hover:-right-8 duration-300 transition-all;
  }
</style>