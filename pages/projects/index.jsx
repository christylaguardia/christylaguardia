import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../../src/components/Layout';
import formatDate from '../../src/helpers/formatDate';
import { fetchByContentType } from '../../src/helpers/contentful';
import css from './index.module.css';

/**
 * NOTE: The `type` order is configured in the field enum in Contentful
 */
export default function Project(props) {
  const { entries: projects } = props;

  if (projects === 'undefined' || !projects) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  // Get all unique project types
  const types = [...new Set(projects.map((project) => project.fields.type))];

  // Group projects by type
  const groupedProjects = types.map((type) => {
    const filteredProjects = projects.filter(
      (project) => project.fields.type === type,
    );
    return {
      type,
      projects: filteredProjects,
    };
  });

  const renderProject = ({
    fields: { slug, title, description, startDate },
  }) => (
    <li key={slug} className={css.item}>
      <div className={css.title}>
        <Link href={{ pathname: `/projects/${slug}` }}>{title}</Link>
        {description && <p>{description}</p>}
      </div>
      <div className={css.small}>
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
            <h2 className={css.year}>{SectionName}</h2>
            <ul className={css.list}>{group.projects.map(renderProject)}</ul>
          </section>
        );
      })}
    </Layout>
  );
}

Project.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.string,
      }),
    }),
  ),
};

export async function getStaticProps() {
  return fetchByContentType('project', { order: '-fields.startDate' });
}
