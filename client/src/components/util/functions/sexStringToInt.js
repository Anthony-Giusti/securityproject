const sexStringToInt = (sex) => {
  switch (sex) {
    case 'M':
      return 1;
    case 'F':
      return 2;
    default:
      return 3;
  }
};

export default sexStringToInt;
