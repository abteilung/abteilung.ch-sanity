<script lang="ts">
  import type { NormalizedCustomBlock } from 'pote-parse';

  import Figure from '../Figure.svelte';

  export let block: NormalizedCustomBlock;

  type FigureProps = Omit<Sanity.Schema.Figure, "image"> & {image:ImageProps};

  const { featured, caption, image } = block.fields as FigureProps;
</script>

<Figure {image} {caption} {featured}></Figure>
