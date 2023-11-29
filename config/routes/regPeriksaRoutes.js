module.exports.routes = {
  'GET /api/v1/regPeriksa/:id': {
    controller: 'RegPeriksaController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/regPeriksa': {
    controller: 'RegPeriksaController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/regPeriksa': {
    controller: 'RegPeriksaController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/regPeriksa/:id': {
    controller: 'RegPeriksaController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/regPeriksa/:id': {
    controller: 'RegPeriksaController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/regPeriksa': {
    controller: 'RegPeriksaController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
