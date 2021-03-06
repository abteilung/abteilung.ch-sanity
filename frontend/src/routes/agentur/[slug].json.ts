import groq from 'groq';
import { parseISO, format } from 'date-fns';
import { sanity } from '$lib/sanity';
import { generateImages } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "author" && slug.current == $slug][0] {
    name,
    image,
    "slug": slug.current,
    bio[] {
      ...,
      _type == 'figure' => {
        ...,
        image { asset-> }
      }
    }
  }
`;


export const get = async ({ params }) => {
  const { slug } = params;

  const result = await sanity.fetch<Author>(query, { slug });

  const transformedBody = result.bio.map((x) => {
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
      body: {
        ...result,
        bio: transformedBody ?? [],
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find author /${slug} from Sanity.io`)
  };
};