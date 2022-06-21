import imageUrlBuilder from '@sanity/image-url';

import { sanity } from '$lib/sanity';

const builder = imageUrlBuilder(sanity);
const urlFor = source => builder.image(source);

type SanityImage = {
  // FIXME: Maybe GROQ codegen will help this?
  //        https://github.com/ricokahler/sanity-codegen/issues/5
  asset: Record<string, any>,
  crop?: Sanity.ImageCrop,
  hotspot?: Sanity.ImageHotspot
};

type Dimmensions = {
  width: number,
  height?: number
}

const widthsPreset = [640, 768, 1024, 1366, 1600, 1920, 2560];

export const generateImage = ({ asset, crop, hotspot }: SanityImage, width: number, height: number = null): ImageProps=> {

  let aspectRatio = !crop ?
    asset.metadata.dimensions.aspectRatio :
    getCropFactor(crop) * asset.metadata.dimensions.aspectRatio;

  const placeholder = asset.metadata.lqip;

  let assetSrc = urlFor(asset).auto("format").width(width).height(height ?? width * aspectRatio).fit("crop");

  return {
    aspectRatio,
    placeholder,
    src: assetSrc.url(),
    srcset: assetSrc.url(),
    alt: asset.altText ?? ""
  };
};

// Code taken from here: https://www.apostrof.co/blog/svelte-sanity-responsive-lazy-loaded-jank-free-images/
export const generateImages = ({ asset, crop, hotspot }: SanityImage): ImageProps=> {

  let aspectRatio = !crop ?
    asset.metadata.dimensions.aspectRatio :
    getCropFactor(crop) * asset.metadata.dimensions.aspectRatio;

  const placeholder = asset.metadata.lqip;

  let assetSrc = urlFor(asset).auto("format");
  if(crop) {
    assetSrc = assetSrc.fit("crop");
  }

  return {
    aspectRatio,
    width: asset.metadata.dimensions.width,
    height: asset.metadata.dimensions.height,
    placeholder,
    src: assetSrc.url(),
    srcset: widthsPreset.filter(w => w <= asset.metadata.dimensions.width).map(w => assetSrc.width(w).url() + ' ' + w + 'w').join(','),
    alt: asset.altText ?? ""
  };
};

const getCropFactor = ({ top, bottom, left, right }) => {
  const xFactor = 1 - (left + right);
  const yFactor = 1 - (top + bottom);

  return xFactor / yFactor;
};
