import groq from 'groq';
import { sanity } from '$lib/sanity';
import { generateImages } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "product" && slug.current == $slug][0] {
    title,
    mainImage,
    "slug": slug.current
  }
`;

export const get = async ({ params }) => {
  const { slug } = params;

  const result = await sanity.fetch<Product>(query, { slug });

  const transformedBody = result.body.map((x) => {
    if(x._type === 'figure') {
      return {
        ...x,
        image: generateImages(x.image)
      }
    } else {
      return x;
    }
  });

  if (result) {
    return {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find product /${slug} from Sanity.io`)
  };
};
