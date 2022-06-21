<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import Icon from '@svicons/remix-fill/linkedin-box.svelte'

  export let url;
  export let ariaLabel = 'Share on LinkedIn';

  let href;
  $: href = encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
</script>


<ShareButton class="transition hover:text-light-blue-700" {ariaLabel} {href}>
  <Icon class="h-6"></Icon>

</ShareButton>

