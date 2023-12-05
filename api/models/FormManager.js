module.exports = {
  tableName: 'form_manager',
  attributes: {
    name: {
      type: 'string',
      required: true,
      columnName: 'name',
      unique: true,
    },
    columnLength: {
      type: 'string',
      required: true,
      columnName: 'columnLength',
    },
    description: {
      type: 'string',
      columnName: 'description',
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
      defaultsTo: false,
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
  },
}
