module.exports = {
  tableName: 'zk_form_manager',
  attributes: {
    name: {
      type: 'string',
      columnName: 'name',
    },
    description: {
      type: 'string',
      columnName: 'description',
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
    },
    deletedBy: {
      type: 'string',
      columnName: 'deletedBy',
    },
    deletedAt: {
      type: 'ref',
      columnName: 'deletedAt',
    },
    status: {
      type: 'string',
      columnName: 'status',
    },
    dynamicForm: {
      model: 'dynamicForm',
    },
  },
}
