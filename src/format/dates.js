import moment from 'moment';

function format(date) {
  if (date === undefined) return '';
  console.log('date=', JSON.stringify(date));
  let momentDate = moment(date);
  return momentDate.format('DD/MM/YYYY à HH:mm');
}

export default format;
