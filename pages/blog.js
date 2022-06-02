import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import { fetchTags, fetchByContentType } from '../src/helpers/contentful';

export default function Blog(props) {
  const { entries: posts } = props;
  const [tagId, setTagId] = useState('cultLife');
  const [tags, setTags] = useState(null);

  if (posts === 'undefined' || !posts) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  useEffect(() => {
    async function getData() {
      const response = await fetchTags('blogPost');
      const tags = response.map(({ name, sys }) => ({ name, id: sys.id }));
      setTags(tags);
    }
    getData();
  }, [setTags]);

  // Assume there is only one tag
  const getFirstTag = (post) => post.metadata?.tags[0]?.sys?.id || 'noTag';

  const groupPosts = posts.reduce((groupedPosts, post) => {
    // Draft posts don't have a publish date
    if (!post.fields.publishDate) return groupedPosts;

    const tag = getFirstTag(post);
    const year = parseInt(post.fields.publishDate.substring(0, 4), 10);

    if (Object.prototype.hasOwnProperty.call(groupedPosts, tag)) {
      if (groupedPosts[tag][year]) {
        return {
          ...groupedPosts,
          [tag]: {
            ...groupedPosts[tag],
            [year]: [...groupedPosts[tag][year], post],
          },
        };
      }

      return {
        ...groupedPosts,
        [tag]: {
          ...groupedPosts[tag],
          [year]: [post],
        },
      };
    } else {
      return {
        ...groupedPosts,
        [tag]: {
          [year]: [post],
        },
      };
    }
  }, {});

  const renderTags = (tags) => {
    if (!tags) return null;

    return (
      <div>
        <ul className="tag-list">
          {tags.map(({ id, name }) => (
            <li key={id} className="tag-list-item" onClick={() => setTagId(id)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPost = ({
    fields: { slug, title, description, publishDate, readTime },
  }) => (
    <li key={slug} className="blog-list-item">
      <div className="blog-list-item-title">
        <Link href={{ pathname: `/blog/${slug}` }}>
          <a href={`/blog/${slug}`}>{title}</a>
        </Link>
        {description && <p>{description}</p>}
      </div>
      <div className="blog-list-item-small">
        <small>{publishDate && <span>{`${readTime} min read`}</span>}</small>
      </div>
    </li>
  );

  const postsByTag = groupPosts[tagId];

  const years = Object.keys(postsByTag).reverse();

  return (
    <Layout pageTitle="Blog">
      {tags && renderTags(tags)}
      {years.map((year) => (
        <section key={year}>
          <h2 className="blog-year">{year}</h2>
          <ul className="blog-list">
            {postsByTag[year].map((post) => renderPost(post))}
          </ul>
        </section>
      ))}
    </Layout>
  );
}

Blog.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        publishDate: PropTypes.string,
      }),
    })
  ),
};

export async function getStaticProps() {
  return fetchByContentType('blogPost', { order: '-fields.publishDate' });
}
