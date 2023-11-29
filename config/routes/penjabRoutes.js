module.exports.routes = {
  'GET /api/v1/penjab/:id': {
    controller: 'PenjabController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/penjab': {
    controller: 'PenjabController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/penjab': {
    controller: 'PenjabController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/penjab/:id': {
    controller: 'PenjabController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/penjab/:id': {
    controller: 'PenjabController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/penjab': {
    controller: 'PenjabController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
