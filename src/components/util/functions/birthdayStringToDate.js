import date from 'date-and-time';

const brithdayStringToDate = (birthday) => date.format(birthday, 'MM-DD-YYYY');

export default brithdayStringToDate;
