import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import formatDate from '../src/helpers/formatDate';

export default function Project({ projects }) {
  if (projects === 'undefined' || !projects) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const { clientProjects, personalProjects } = projects.reduce(
    (projectsByType, project) => {
      if (project.fields.client === true) {
        projectsByType.clientProjects.push(project);
      } else {
        projectsByType.personalProjects.push(project);
      }
      return projectsByType;
    },
    { clientProjects: [], personalProjects: [] }
  );

  const renderProject = ({
    fields: { slug, title, description, startDate },
  }) => (
    <li key={slug} className="blog-list-item">
      <div className="blog-list-item-container">
        <Link href={{ pathname: `/projects/${slug}` }}>
          <a href={`/projects/${slug}`}>{title}</a>
        </Link>
        {description && <p>{description}</p>}
      </div>
      <small>
        <span>{formatDate(startDate, 'monthyear')}</span>
      </small>
    </li>
  );

  return (
    <Layout pageTitle="Projects">
      <section>
        <h2 className="blog-year">Client Projects</h2>
        <ul className="blog-list">
          {clientProjects.map((project) => renderProject(project))}
        </ul>
      </section>
      <section>
        <h2 className="blog-year">Personal Projects</h2>
        <ul className="blog-list">
          {personalProjects.map((project) => renderProject(project))}
        </ul>
      </section>
    </Layout>
  );
}

Project.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
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
