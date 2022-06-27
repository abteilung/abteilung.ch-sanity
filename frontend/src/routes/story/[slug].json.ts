import groq from 'groq';
import { parseISO, format } from 'date-fns';
import { sanity } from '$lib/sanity';
import { generateImages } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    mainImage,
    subtitle,
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

export type QueryResult = Story

export const get = async ({ params }) => {
  const { slug } = params;

  const result = await sanity.fetch<Post>(query, { slug });

  if (result) {
    const transformedBody = result.body?.map((block) => {
      if(block._type === 'figure') {
        return {
          ...block,
          image: block.image ? generateImages(block.image) : null
        }
      } else {
        return block
      }
    });

    // const transformedMembers = result.members?.map(({ name, avatar}) => ({
    //   name,
    //   avatar: avatar ? generateImage(avatar, 100, 100) : null
    // }));

    return {
      body: {
        ...result,
        body: transformedBody ?? [],
        // members: transformedMembers ?? [],
        mainImage: result.mainImage ? generateImages(result.mainImage) : null,
        publishedAt: result.publishedAt ? format(parseISO(result.publishedAt), "MMMM ''yy") : "N/A"
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
