import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import formatDate from '../src/helpers/formatDate';

/**
 * The `type` field groups project by categories.
 * The values for `type` are hardcoded in Contentful.
 * If a new `type` is added in Contendful, it will need to be added below.
 * TODO: make `type` dynamic.
 */

export default function Project({ projects }) {
  if (projects === 'undefined' || !projects) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const {
    consultingProjects,
    clientProjects,
    personalProjects,
    studentProjects,
  } = [...projects].reduce(
    (projectsByType, project) => {
      if (project.fields.type === 'Consulting') {
        projectsByType.consultingProjects.push(project);
      } else if (project.fields.type === 'Client') {
        projectsByType.clientProjects.push(project);
      } else if (project.fields.type === 'Personal') {
        projectsByType.personalProjects.push(project);
      } else {
        projectsByType.studentProjects.push(project);
      }
      return projectsByType;
    },
    {
      consultingProjects: [],
      clientProjects: [],
      personalProjects: [],
      studentProjects: [],
    }
  );

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
      {consultingProjects.length > 0 && (
        <section>
          <h2 className="blog-year">Consulting Projects</h2>
          <ul className="blog-list">
            {consultingProjects.map((project) => renderProject(project))}
          </ul>
        </section>
      )}
      {clientProjects.length > 0 && (
        <section>
          <h2 className="blog-year">Client Projects</h2>
          <ul className="blog-list">
            {clientProjects.map((project) => renderProject(project))}
          </ul>
        </section>
      )}
      {personalProjects.length > 0 && (
        <section>
          <h2 className="blog-year">Personal Projects</h2>
          <ul className="blog-list">
            {personalProjects.map((project) => renderProject(project))}
          </ul>
        </section>
      )}
      {studentProjects.length > 0 && (
        <section>
          <h2 className="blog-year">Student Projects</h2>
          <ul className="blog-list">
            {studentProjects.map((project) => renderProject(project))}
          </ul>
        </section>
      )}
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
