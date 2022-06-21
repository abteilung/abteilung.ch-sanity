import groq from 'groq';
import { parseISO, format } from 'date-fns';
import { sanity } from '$lib/sanity';
import { generateImages } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    description,
    "slug": slug.current,
    body[] {
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

  const result = await sanity.fetch<Post>(query, { slug });

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
      body: {
        ...result,
        body: transformedBody ?? [],
        publishedAt: format(parseISO(result.publishedAt), "EEE do MMMM ''yy")
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find post /${slug} from Sanity.io`)
  };
};
