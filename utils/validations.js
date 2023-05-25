const validator = require('validator');

const isEmpty = (value) => {
  return validator.isEmpty(value);
};

const userCredentialsAreValid = (email, password) => {
  return validator.isEmail(email) && password && password.trim().length >= 6;
};

const userDetailsAreValid = (name, email, password) => {
  return userCredentialsAreValid(email, password) && !isEmpty(name);
};

const emailIsConfirmed = (email, confirmEmail) => {
  return email === confirmEmail;
};

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
