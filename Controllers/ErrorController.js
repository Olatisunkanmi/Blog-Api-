const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';

	if (process.env.NODE_ENV === 'development') {
		let Error = { ...err };
	}
};
