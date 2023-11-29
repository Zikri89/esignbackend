module.exports.routes = {
  'GET /api/v1/poliklinik/:id': {
    controller: 'PoliklinikController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/poliklinik': {
    controller: 'PoliklinikController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/poliklinik': {
    controller: 'PoliklinikController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/poliklinik/:id': {
    controller: 'PoliklinikController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/poliklinik/:id': {
    controller: 'PoliklinikController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/poliklinik': {
    controller: 'PoliklinikController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
