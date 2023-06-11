const User = require('../models/user');
const createToken = require('../utils/createToken');
const validation = require('../utils/validations');

const signup = async (req, res, next) => {
  let signedUser;
  const enteredData = {
    name: req.body.name,
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.name,
      req.body.email,
      req.body.password
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    res.status(300).json({ message: 'Please check your inputs correctly' });
    return;
  }

  const user = new User(req.body.email, req.body.password, req.body.name);

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      res
        .status(300)
        .json({ message: 'User exists already! Try logging in instead!' });
      return;
    }

    signedUser = await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  // create a token
  const token = createToken(signedUser._id);
  res.status(200).json({ enteredData, token });
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.status(300).json({
      message:
        'Invalid credentials - please double-check your email and password!',
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.status(300).json({
      message:
        'Invalid credentials - please double-check your email and password!',
    });
    return;
  }

  // create a token
  const token = createToken(existingUser._id);
  res.status(200).json({ existingUser, token });
};

module.exports = {
  signup: signup,
  login: login,
};
