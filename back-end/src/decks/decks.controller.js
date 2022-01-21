const service = require('./decks.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
//Validation
async function deckExists(req, res, next) {
  const deck = await service.read(req.params.deckId);
  if (deck) {
    res.locals.deck = deck;
    return next();
  }
  next({ status: 404, message: 'Deck cannot be found.' });
}

// CRUDL
function passDownBodyToPipeline(req, res, next) {
  const body = req.body.data ?? req.body;
  res.locals.body = body;
  next();
}

async function list(_req, res) {
  const data = await service.list();
  res.json({ data });
}

async function destroy(req, res) {
  const { deckId } = req.params;
  await service.destroy(deckId);
  res.sendStatus(204);
}

async function read(_req, res) {
  const { deck: data } = res.locals;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  destroy: [asyncErrorBoundary(deckExists), asyncErrorBoundary(destroy)],
  read: [asyncErrorBoundary(deckExists), asyncErrorBoundary(read)],
};
