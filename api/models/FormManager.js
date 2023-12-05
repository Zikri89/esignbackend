module.exports = {
  datastore: 'mongodb',
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
  },
}
