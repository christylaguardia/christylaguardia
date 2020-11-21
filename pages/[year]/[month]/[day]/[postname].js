import React from 'react';
import PropTypes from 'prop-types';
import matter from 'gray-matter';
import Layout from '../../../../src/components/Layout';
import Post from '../../../../src/components/Post';
import createSlug from '../../../../src/helpers/createSlug';

export default function BlogPost(props) {
  const { date, frontmatter, markdownBody } = props;

  if (!frontmatter) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  return (
    <Layout pageTitle={frontmatter.title}>
      <Post date={date} frontmatter={frontmatter} markdownBody={markdownBody} />
    </Layout>
  );
}

BlogPost.propTypes = {
  date: PropTypes.string.isRequired,
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  markdownBody: PropTypes.string,
};

export async function getStaticProps({ ...ctx }) {
  const { year, month, day, postname } = ctx.params;
  const date = `${year}-${month}-${day}`;
  // eslint-disable-next-line
  const content = await import(
    `../../../../posts/${date}_${postname}.md`
  );
  const data = matter(content.default);

  return {
    props: {
      date,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys().map((key) => createSlug(key));
    return keys.map(({ slug }) => slug);
  })(require.context('../../../../posts', true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
