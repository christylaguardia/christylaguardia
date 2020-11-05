import React from 'react';
import PropTypes from 'prop-types';
import matter from 'gray-matter';
import Layout from '../src/components/Layout';
import About from '../src/components/About';
import PostItem from '../src/components/PostItem';

export default function Index(props) {
  const { posts } = props;

  if (posts === 'undefined' || !posts) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  return (
    <Layout>
      <About />
      <section>
        {posts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </section>
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
        const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
        const date = slug.split('_')[0];
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
