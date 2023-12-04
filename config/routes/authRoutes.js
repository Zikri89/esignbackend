module.exports.routes = {
  'POST /api/v1/auth': {
    controller: 'AuthController',
    action: 'auth',
    middleware: 'checkApiKey',
  },
}
