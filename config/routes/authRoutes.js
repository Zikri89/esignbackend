module.exports.routes = {
  'POST /api/v1/auth': {
    controller: 'AuthController',
    action: 'auth',
    middleware: 'checkApiKey',
  },

  'GET /api/v1/authWithToken': {
    controller: 'AuthController',
    action: 'authWithToken',
    middleware: 'checkApiKey',
  },
}
