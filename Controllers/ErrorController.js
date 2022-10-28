const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';

	const handleDevError = (err, res) => {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			// err: err,
		});
	};

	if (process.env.NODE_ENV === 'development') {
		let error = { ...err };
		handleDevError(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let Error = { ...err };
	}
};
