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
 * There are two types of date formats, used in posts and file names
 * This helper parses the string and formats like "November, 7, 2020"
 * @param {string} dateString
 */

export default function formatDate(dateString) {
  if (!dateString) {
    return null;
  }

  let year, month, day;

  // Date is formatted like 2020-11-07
  if (dateString.indexOf('-')) {
    const splitDate = dateString.split('-');
    year = splitDate[0];
    month = splitDate[1];
    day = splitDate[2];
  }

  // Date is formatted like 11/07/2020
  if (dateString.indexOf('-')) {
    const splitDate = dateString.split('/');
    year = splitDate[2];
    month = splitDate[0] - 1;
    day = splitDate[1];
  }

  if (year === undefined || month === undefined || day === undefined) {
    return null;
  }

  const date = new Date(year, month, day);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
