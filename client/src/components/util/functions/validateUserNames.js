import isAlpha from 'validator/es/lib/isAlpha';

const validateUserNames = (user) => {
  const errors = {
    firstName: false,
    lastName: false,
  };

  if (!isAlpha(user.firstName)) {
    errors.firstName = true;
  }
  if (!isAlpha(user.lastName)) {
    errors.lastName = true;
  }

  return errors;
};

export default validateUserNames;
