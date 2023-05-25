const handleErrors = (error, req, res, next) => {
  console.log(error);

  if (error.code === 404) {
    return res.status(404).json({ message: 'Not Found' });
  }

  res.status(500).json({ message: 'Server Error' });
};

module.exports = handleErrors;
