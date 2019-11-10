function format(date) {
  if (date === undefined) return '';
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

export default format;
