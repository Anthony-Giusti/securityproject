import date from 'date-and-time';

const brithdayDateToString = (birthday: Date) => date.format(birthday, 'MM-DD-YYYY');

export default brithdayDateToString;
