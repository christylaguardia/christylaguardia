export default function sortPostsByYear(posts) {
  return posts.reduce(
    (postsByYear, post) => {
      const year = parseInt(post.date.substring(0, 4), 10);

      if (Object.prototype.hasOwnProperty.call(postsByYear, 'year')) {
        postsByYear[year].push(post);
      } else {
        postsByYear[year] = [post];
      }

      return postsByYear;
    },
    { 2020: [] }
  );
}
