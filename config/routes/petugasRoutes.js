module.exports.routes = {
  'GET /api/v1/petugas/:id': {
    controller: 'PetugasController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/petugas': {
    controller: 'PetugasController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/petugas': {
    controller: 'PetugasController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/petugas/:id': {
    controller: 'PetugasController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/petugas/:id': {
    controller: 'PetugasController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/petugas': {
    controller: 'PetugasController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
