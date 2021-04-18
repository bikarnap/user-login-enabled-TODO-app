const { response } = require('express');
const logger = require('./logger');

const handleError = (error, req, res, next) => {
    if (error.name === 'CastError') {
      return res.status(400).send({
        error: 'malformatted todo id'
      });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: error.message
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'token expired'
      });
    }

    logger.error(error.message);
    next(error);
  };

  module.exports = {
      handleError
  };