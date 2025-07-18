import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Alternative urlFor functions for different use cases
export const urlForUncropped = (source: SanityImageSource) => {
  return builder.image(source).fit('max').auto('format');
};

export const urlForFill = (
  source: SanityImageSource,
  width: number,
  height: number
) => {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('fill')
    .auto('format');
};

export const urlForClip = (
  source: SanityImageSource,
  width: number,
  height: number
) => {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('clip')
    .auto('format');
};

// remove object-cover from the image
export const urlForWithHotspot = (
  source: SanityImageSource,
  width: number,
  height: number
  // crop:
  //   | 'top'
  //   | 'center'
  //   | 'bottom'
  //   | 'focalpoint'
  //   | 'left'
  //   | 'right'
  //   | 'entropy' = 'center'
) => {
  return (
    builder
      .image(source)
      .width(width)
      .height(height)
      .fit('crop')
      // .crop(crop)
      .auto('format')
  );
};
