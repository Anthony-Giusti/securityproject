import date from 'date-and-time';

const brithdayDateToString = (birthday) => date.parse(birthday, 'MM-DD-YYYY');

export default brithdayDateToString;
