<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import Icon from '@svicons/remix-fill/facebook.svelte'

  export let url;
  export let ariaLabel = 'Share on Facebook';

  let href;
  $: href = encodeURI(`https://facebook.com/sharer/sharer.php?u=${url}`);
</script>

<ShareButton class="transition hover:text-blue-600" {ariaLabel} {href}>
  <Icon class="h-6"></Icon>
</ShareButton>

