<script lang="ts">
  import Icon from '@svicons/remix-fill/whatsapp.svelte'
  import ShareButton from './ShareButton.svelte';

  export let text;
  export let ariaLabel = 'Share on Twitter';

  let href: string;
  $: href = encodeURI(`whatsapp://send?text=${text}`);
</script>

<ShareButton class="transition hover:text-emerald-500" {ariaLabel} {href}>
  <Icon class="h-6"></Icon>
</ShareButton>
