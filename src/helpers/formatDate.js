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

export default function formatDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(`${dateString} MST`); // hardcoded timezone
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}
