import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../../src/components/Layout';
import formatDate from '../../src/helpers/formatDate';

export default function ProjectSlug({ project }) {
  if (project === 'undefined' || !project) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }
  const {
    fields: { title, description, startDate, body, techStack: tags },
  } = project;

  return (
    <Layout pageTitle={title}>
      <section className="article">
        <h2>{title}</h2>
        <h3>{description}</h3>
        <p>
          <small>{formatDate(startDate, 'monthyear')}</small>
        </p>
        <Markdown source={body} escapeHtml={true} />
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
}

ProjectSlug.propTypes = {
  project: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  }),
};

export async function getStaticProps(context) {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch all results where `fields.slug` is equal to the `slug` param
  const result = await client
    .getEntries({
      content_type: 'project',
      'fields.slug': context.params.slug,
    })
    .then((response) => response.items);

  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct project.
  const project = result.pop();

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!project) {
    return { props: {} };
  }

  // Return the project as props
  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Query Contentful for all projects in the space
  const projects = await client
    .getEntries({ content_type: 'project', order: '-fields.startDate' })
    .then((response) => response.items);

  // Map the result of that query to a list of slugs.
  // This will give Next the list of all project pages that need to be
  // rendered at build time.
  const paths = projects.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
