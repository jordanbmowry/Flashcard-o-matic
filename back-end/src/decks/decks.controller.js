const service = require('./decks.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(_req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
