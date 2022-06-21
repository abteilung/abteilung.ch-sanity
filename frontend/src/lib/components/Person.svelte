<script lang="ts">
  import Image from "./Image.svelte";

  export let name: string;
  export let avatar: ImageProps;
</script>

<div class="flex items-center space-x-2">
  <div class="w-12 h-12 sm:(w-10 h-10) overflow-hidden rounded-full">
    <Image {...avatar}></Image>
  </div>
  <div class="flex-grow text-base font-light sm:text-sm">
    {name}
  </div>
</div>
