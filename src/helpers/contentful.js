/**
 * Helpers for Contentful data fetching.
 */

const createClient = () =>
  require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

export const fetchByEntry = async (entryId) => {
  // Create an instance of the Contentful JavaScript SDK
  const client = createClient();

  // Fetch a single entry
  const entry = await client.getEntry(entryId);

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!entry) {
    return { props: {} };
  }

  return {
    props: {
      entry,
    },
  };
};

export const fetchByContentType = async (contentType, query) => {
  // Create an instance of the Contentful JavaScript SDK
  const client = createClient();

  // Fetch all entries of content_type
  const entries = await client
    .getEntries({ content_type: contentType, ...query })
    .then((response) => response.items);

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!entries) {
    return { props: {} };
  }

  return {
    props: {
      entries,
    },
  };
};

export const fetchPathsByContentType = async (contentType, query) => {
  // Create an instance of the Contentful JavaScript SDK
  const client = createClient();

  // Query Contentful for all pages in the space
  const pages = await client
    .getEntries({ content_type: contentType, ...query })
    .then((response) => response.items);

  // Map the result of that query to a list of slugs.
  // This will give Next the list of all page pages that need to be
  // rendered at build time.
  const paths = pages.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
