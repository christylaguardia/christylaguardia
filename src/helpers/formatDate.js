const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * This helper parses the date string like "2020-11-07"
 * and formats like "November, 7, 2020"
 * @param {string} dateString
 * @param {string} format
 */

export default function formatDate(dateString, format = 'long') {
  if (!dateString) {
    return null;
  }

  const splitDate = dateString.split('-');
  const year = parseInt(splitDate[0], 10);
  const month = parseInt(splitDate[1], 10);
  const monthIndex = month - 1;
  const day = parseInt(splitDate[2], 10);
  const date = new Date(year, monthIndex, day);

  if (!date) {
    return null;
  }

  if (format === 'monthyear') {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
