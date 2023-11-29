module.exports.routes = {
  'GET /api/v1/pasien/:id': {
    controller: 'PasienController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/pasien': {
    controller: 'PasienController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/pasien': {
    controller: 'PasienController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/pasien/:id': {
    controller: 'PasienController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/pasien/:id': {
    controller: 'PasienController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/pasien': {
    controller: 'PasienController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
