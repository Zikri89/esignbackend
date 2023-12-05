module.exports.routes = {
  'GET /api/v1/dokter/:id': {
    controller: 'DokterController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/dokter': {
    controller: 'DokterController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/dokter': {
    controller: 'DokterController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/dokter/:id': {
    controller: 'DokterController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/dokter/:id': {
    controller: 'DokterController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/dokter': {
    controller: 'DokterController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/dokter/:id': {
    controller: 'DokterController',
    action: 'destroyById',
    middleware: 'checkApiKey',
  },
}
