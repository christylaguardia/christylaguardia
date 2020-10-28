import matter from 'gray-matter';
import Layout from '../src/components/Layout';
import PostList from '../src/components/PostList';

const Index = ({ posts }) => {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys
      .map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
        const value = values[index];
        const document = matter(value.default);
        return {
          frontmatter: document.data,
          markdownBody: document.content,
          slug,
        };
      })
      .reverse();

    return data;
  })(require.context('../posts', true, /\.md$/));

  return {
    props: {
      posts,
    },
  };
}
