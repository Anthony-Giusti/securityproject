const sexStringToInt = (sex: string) => {
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
