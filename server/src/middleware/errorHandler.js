export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url} -`, err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // MySQL Specific Errors
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'A record with this information already exists (Duplicate Entry).';
  } else if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
    statusCode = 400;
    message = 'Invalid reference identifier (Foreign key not found).';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Database service temporarily unavailable. Please verify MySQL Server is running.';
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token. Please sign in again.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired. Please sign in again.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.originalUrl}' not found.`
  });
};
