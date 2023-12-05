module.exports.routes = {
  'GET /api/v1/formManager/:id': {
    controller: 'FormManagerController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/formManager': {
    controller: 'FormManagerController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/formManager': {
    controller: 'FormManagerController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/formManager/:id': {
    controller: 'FormManagerController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/formManager/:id': {
    controller: 'FormManagerController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/formManager': {
    controller: 'FormManagerController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },

  'DELETE /api/v1/formManager/:id': {
    controller: 'FormManagerController',
    action: 'destroyById',
    middleware: 'checkApiKey',
  },
}
