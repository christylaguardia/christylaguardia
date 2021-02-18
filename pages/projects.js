import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Image from 'next/image';
import Layout from '../src/components/Layout';

export default function Projects(props) {
  const { projects } = props;

  return (
    <Layout>
      {projects.map(
        ({
          fields: {
            title,
            image: {
              fields: {
                file: { url: imageUrl },
              },
            },
            body,
            techStack: tags,
          },
        }) => (
          <section className="project">
            <div className="">
              <Image
                src={`https:${imageUrl}`}
                alt={title}
                loading="lazy"
                height={100}
                width={100}
              />
            </div>
            <div className="">
              <h2>{title}</h2>
              <Markdown source={body} escapeHtml={true} />
              <div className="tags">
                {tags.map((tag) => (
                  <span className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </section>
        )
      )}
    </Layout>
  );
}

Projects.propTypes = {
  person: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.object,
      body: PropTypes.string,
    }),
  }),
};

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Query Contentful for all projects in the space
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
