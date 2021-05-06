const pageNotFoundHandler = (req,res) => {
  res.status(404).json({success: false, message:"Page Not Found"})
}

module.exports = { pageNotFoundHandler }