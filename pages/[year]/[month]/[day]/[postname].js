import React from 'react';
import PropTypes from 'prop-types';
import matter from 'gray-matter';
import Layout from '../../../../src/components/Layout';
import Post from '../../../../src/components/Post';
import createSlug from '../../../../src/helpers/createSlug';

export default function BlogPost(props) {
  const { frontmatter, markdownBody } = props;

  if (!frontmatter) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  return (
    <Layout pageTitle={frontmatter.title}>
      <Post frontmatter={frontmatter} markdownBody={markdownBody} />
    </Layout>
  );
}

BlogPost.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  markdownBody: PropTypes.string,
};

export async function getStaticProps({ ...ctx }) {
  const { year, month, day, postname } = ctx.params;
  const content = await import(`../../../../posts/${year}-${month}-${day}_${postname}.md`);
  const data = matter(content.default);

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key, index) => createSlug(key));
    return data.map(({ slug }) => slug);
  })(require.context('../../../../posts', true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
