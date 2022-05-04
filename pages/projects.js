import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import formatDate from '../src/helpers/formatDate';

/**
 * NOTE: The `type` order is configured in the field enum in Contentful
 */
export default function Project({ projects }) {
  if (projects === 'undefined' || !projects) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  // Get all unique project types
  const types = [...new Set(projects.map((project) => project.fields.type))];

  // Group projects by type
  const groupedProjects = types.map((type) => {
    const filteredProjects = projects.filter(
      (project) => project.fields.type === type
    );
    return {
      type,
      projects: filteredProjects,
    };
  });

  const renderProject = ({
    fields: { slug, title, description, startDate },
  }) => (
    <li key={slug} className="blog-list-item">
      <div className="blog-list-item-title">
        <Link href={{ pathname: `/projects/${slug}` }}>
          <a href={`/projects/${slug}`}>{title}</a>
        </Link>
        {description && <p>{description}</p>}
      </div>
      <div className="blog-list-item-small">
        <small>
          <span>{formatDate(startDate, 'monthyear')}</span>
        </small>
      </div>
    </li>
  );

  return (
    <Layout pageTitle="Projects">
      {groupedProjects.map((group, index) => {
        const SectionName = types[index];
        return (
          <section key={SectionName}>
            <h2 className="blog-year">{SectionName}</h2>
            <ul className="blog-list">{group.projects.map(renderProject)}</ul>
          </section>
        );
      })}
    </Layout>
  );
}

Project.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.string,
      }),
    })
  ),
};

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch all entries of content_type
  const projects = await client
    .getEntries({ content_type: 'project', order: '-fields.startDate' })
    .then((response) => response.items);

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!projects) {
    return { props: {} };
  }

  return {
    props: {
      projects,
    },
  };
}
