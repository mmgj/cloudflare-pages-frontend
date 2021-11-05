import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
} from 'next-sanity';
import { config } from './config';

/**
 * Export configured client ready to use
 * Read more: https://www.sanity.io/docs/js-client
 */
export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});
