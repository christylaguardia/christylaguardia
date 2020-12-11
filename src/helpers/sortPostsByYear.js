export default function sortPostsByYear(posts) {
  return posts.reduce(
    (postsByYear, post) => {
      // Draft posts don't have a publish date
      if (!post.fields.publishDate) return postsByYear;

      const year = parseInt(post.fields.publishDate.substring(0, 4), 10);

      if (Object.prototype.hasOwnProperty.call(postsByYear, year)) {
        postsByYear[year].push(post);
      } else {
        postsByYear[year] = [post];
      }

      return postsByYear;
    },
    {}
  );
}
