<script lang="ts">
  import Icon from '@svicons/remix-fill/twitter.svelte'
  import ShareButton from './ShareButton.svelte';

  export let text;
  export let url;
  export let ariaLabel = 'Share on Twitter';
  export let hashtags = '';
  export let via = '';
  export let related = '';

  let href: string;
  $: href = encodeURI(`https://twitter.com/intent/tweet/?text=${text}&hashtags=${hashtags}&via=${via}&related=${related}&url=${url}`);
</script>

<ShareButton class="transition hover:text-blue-400" {ariaLabel} {href}>
  <Icon class="h-6"></Icon>
</ShareButton>
