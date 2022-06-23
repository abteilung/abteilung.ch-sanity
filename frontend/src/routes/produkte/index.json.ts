import groq from 'groq';
import { sanity } from '$lib/sanity';

const query = groq`
  *[_type == "product"] {
    title,
    "slug": slug.current,
    productIcon,
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Product, "title"> & { slug: string }>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
  });

  if (results) {
    const products = results.map(({ title, slug, productIcon }) => ({
      title,
      slug,
      productIcon,
    }));

    return {
      body: products,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find products from Sanity.io`)
  };
}
