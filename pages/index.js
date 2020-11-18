import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '../src/components/Layout';
import createSlug from '../src/helpers/createSlug';
import sortPostsByYear from '../src/helpers/sortPostsByYear';
import formatDate from '../src/helpers/formatDate';
export default function Index(props) {
  const { posts } = props;

  if (posts === 'undefined' || !posts) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const postsByYear = sortPostsByYear(posts);
  const years = Object.keys(postsByYear).reverse();

  return (
    <Layout className="blog-section">
      {years.map((year) => (
        <section key={year}>
          <h2 className="blog-year">{year}</h2>
          <ul className="blog-list">
            {postsByYear[year].map((post) => (
              <li key={post.slug} className="blog-list-item">
                <Link href={{ pathname: `/${post.slug}` }}>
                  <a>{post.frontmatter.title}</a>
                </Link>
                <span>{formatDate(post.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Layout>
  );
}

Index.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        date: PropTypes.string,
      }),
      date: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export async function getStaticProps() {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys
      .map((key, index) => {
        const { date, slug } = createSlug(key);
        const value = values[index];
        const document = matter(value.default);

        return {
          frontmatter: document.data,
          markdownBody: document.content,
          slug,
          date,
        };
      })
      .filter(({ date }) => date !== 'DRAFT') // Don't show drafts
      .reverse(); // Show in descending order

    return data;
  })(require.context('../posts', true, /\.md$/));

  return {
    props: {
      posts,
    },
  };
}
