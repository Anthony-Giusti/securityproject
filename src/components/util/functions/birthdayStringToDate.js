import date from 'date-and-time';

const brithdayStringToDate = (birthday) => date.parse(birthday, 'MM-DD-YYYY');

export default brithdayStringToDate;
