module.exports.routes = {
  'GET /api/v1/dynamicForm/:id': {
    controller: 'DynamicFormController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/dynamicForm': {
    controller: 'DynamicFormController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/dynamicForm': {
    controller: 'DynamicFormController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/dynamicForm/:id': {
    controller: 'DynamicFormController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/dynamicForm/:id': {
    controller: 'DynamicFormController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/dynamicForm': {
    controller: 'DynamicFormController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },

  'DELETE /api/v1/dynamicForm/:id': {
    controller: 'DynamicFormController',
    action: 'destroyById',
    middleware: 'checkApiKey',
  },
}
