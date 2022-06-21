<script>
  // Code taken from here https://github.com/pchynoweth/svelte-share-buttons-component

  export let href;
  export let label = '';
  export let ariaLabel = '';

  let className = '';
  export { className as class };
</script>

<a {href} target="_blank" rel="noopener" aria-label={ariaLabel}>
  <div class={className}>
    <div aria-hidden="true">
      <slot></slot>
    </div>
    {label}
  </div>
</a>
