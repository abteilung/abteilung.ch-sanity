import groq from 'groq';
import { sanity } from '$lib/sanity';

const query = groq`
  *[_type == "author"] {
    name,
    "slug": slug.current,
    image,
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Author, "name"> & { slug: string }>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
  });

  if (results) {
    const authors = results.map(({ name, slug, image }) => ({
      name,
      slug,
      image,
    }));

    return {
      body: authors,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find authors from Sanity.io`)
  };
}
