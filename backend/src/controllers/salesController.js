const salesService = require('../services/salesService');
const buildQueryOptions = require('../utils/buildQueryOptions');

exports.getSales = (req, res, next) => {
  try {
    const options = buildQueryOptions(req.query);
    const result = salesService.getSales(options);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
