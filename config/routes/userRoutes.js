module.exports.routes = {
  'GET /api/v1/user/:id': {
    controller: 'UserController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/user': {
    controller: 'UserController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/user': {
    controller: 'UserController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/user/:id': {
    controller: 'UserController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/user/:id': {
    controller: 'UserController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/user': {
    controller: 'UserController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
