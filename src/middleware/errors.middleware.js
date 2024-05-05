// ************************************
// ERROR-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

/**
 * Handle req that would produce a 404 status code and respons accordingly.
 */
exports.error404 = (req, res, next) => {
    next({ message: 'Not Found', status: 404 }); //next  = run the next piece of middleware (see if there are any 500 errors in index.js)
  };
  
  /**
   * Handle req that would produce a 500 status code and respons accordingly.
   */
exports.error500 = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    },
  });
  return;
};