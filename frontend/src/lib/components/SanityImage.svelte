<!-- SanityImage.svelte -->
<script lang="ts">
	import getImageProps from '../utils/getImageProps';

	export let image: ImageProps;
	export let loading: string = "lazy"
	export let imageClass: string = ""
	export let maxWidth: integer = 800

  function getImageAspectRatio(image) {
    if (!image?.asset?._ref) {
      return 0;
    }

    // example asset._ref:
    //  - image-7558c4a4d73dac0398c18b7fa2c69825882e6210-366x96-png
    // When splitting by '-' we can extract ["image", _id, dimensions, extension]
    const dimensions = image.asset._ref.split("-")[2];
    // "366x96" -> ["366", "96"] -> [366, 96]
    const [width, height] = dimensions.split("x").map(Number);
    return width / height;
  }
</script>

<img
  class={imageClass}
  style="aspect-ratio: ${getImageAspectRatio(image)};"
  {loading}
  fetchPriority={loading === "eager" ? "high" : undefined}
  alt={image.alt || " "}
  {
    ...getImageProps({
      image,
      maxWidth,
    })
  }
/>