const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ error: error.message })
}

module.exports = { errorHandler };