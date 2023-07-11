const errorHandler = (err, req, res, next) => {
  res.statusCode !== 200
    ? res
        .status(res.statusCode)
        .json({ message: err.message, status: res.statusCode })
    : res.status(500);
};

module.exports = { errorHandler };
