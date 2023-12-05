module.exports = {
  tableName: 'user',
  // primaryKey: 'idUser',
  attributes: {
    idUser: {
      type: 'string',
      required: true,
      columnName: 'id_user',
    },
    password: { type: 'string', required: true },
  },
}
