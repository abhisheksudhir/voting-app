module.exports = {
    ...require('./auth'),   //to spread out every individual handler in auth
  };

module.exports.notFound = (req, res, next) => {
    const err = new Error('not found');
    err.status = 404;

    next(err);
};

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'something went wrong'
    });
};

