<script lang="ts">
  import Icon from '@svicons/remix-fill/mail.svelte'
  import ShareButton from './ShareButton.svelte';

  export let subject;
  export let body;
  export let ariaLabel = 'Share by Email';


  let href: string;
  $: href = encodeURI(`mailto:?subject=${subject}&body=${body}`);
</script>

<ShareButton class="transition hover:text-red-400" {ariaLabel} {href}>
  <Icon class="h-6"></Icon>
</ShareButton>
