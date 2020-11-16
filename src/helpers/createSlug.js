export default function createSlug(fileName) {
  const articleName = fileName.replace(/^.*[\\\/]/, '').slice(0, -3);
  const [date, name] = articleName.split('_');
  const [year, month, day] = date.split('-');

  return { date, slug: `${year}/${month}/${day}/${name}` };
}
