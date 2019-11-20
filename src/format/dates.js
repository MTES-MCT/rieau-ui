import moment from 'moment';

function format(date) {
  if (date === undefined) return '';
  let momentDate = moment(date);
  return momentDate.format('DD/MM/YYYY à HH:mm');
}

function dateSortDesc(date1, date2) {
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

export { dateSortDesc };

export default format;
