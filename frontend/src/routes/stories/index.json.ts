import groq from 'groq';
import { sanity } from '$lib/sanity';

import { parseISO, format } from 'date-fns';

const query = groq`
  *[_type == "post" && defined(slug.current) && publishedAt < now()]| order(publishedAt desc) [$start..$end] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Post, "title" | "publishedAt"> & { slug: string }>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
    start: 0, end: 5
  });

  if (results) {
    const posts = results.map(({ title, slug, mainImage, publishedAt }) => ({
      title,
      slug,
      mainImage,
      publishedAt: format(parseISO(publishedAt), "EEE do MMMM ''yy")
    }));

    return {
      body: posts,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find posts from Sanity.io`)
  };
}
