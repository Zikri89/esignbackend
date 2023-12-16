module.exports.routes = {
  'GET /api/v1/formDataPasien/:id': {
    controller: 'FormDataPasienController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/formDataPasien/:id/:formulirId': {
    controller: 'FormDataPasienController',
    action: 'findByIdAndFormulir',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/formDataPasien': {
    controller: 'FormDataPasienController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/formDataPasien': {
    controller: 'FormDataPasienController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/formDataPasien/:id': {
    controller: 'FormDataPasienController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/formDataPasien/:id': {
    controller: 'FormDataPasienController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/formDataPasien': {
    controller: 'FormDataPasienController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/formDataPasien/:id': {
    controller: 'FormDataPasienController',
    action: 'destroyById',
    middleware: 'checkApiKey',
  },
}
