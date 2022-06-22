import imageUrlBuilder from "@sanity/image-url";

export const imageBuilder = imageUrlBuilder({
  projectId: "dmir81f8",
  dataset: "production",
});

/**
 * Example `image`: {asset: {_ref: string}, hotspot: {...}, crop: {...} }
 */
export default function getImageProps({ image, maxWidth = 1200 }) {
  if (!image?.asset?._ref) {
    return {};
  }

  // For all image variations, we'll use an auto format and prevent scaling it over its max dimensions
  const builder = imageBuilder.image(image).fit("max").auto("format");

  // Arbitrary sizes the image could assume
  const baseSizes = [400, 600, 850, 1000, 1150, maxWidth];
  const retinaSizes = Array.from(
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    // Smallest to largest
    .sort()
    .filter(
      (size) =>
        // Exclude those larger than maxWidth's retina (x3)
        size <= maxWidth * 3
    )
    // Exclude those with steps smaller than 50px relative to their following size
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      if (nextSize) {
        return Math.abs(nextSize - size) > 50;
      }

      return true;
    });

  return {
    // Use the original image as the `src` for the <img>
    src: builder.width(maxWidth).url(),

    // Build a `{URL} {SIZE}w, ...` string for the srcset
    srcset: retinaSizes
      .map((size) => `${builder.width(size).url()} ${size}w`)
      .join(", "),
    sizes: `(max-width: ${maxWidth}px) 100vw, ${
      // Ensure browsers use best quality by suggesting the image is slightly larger than it actually is
      maxWidth + 20
    }px`,
  };
}