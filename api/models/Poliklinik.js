module.exports = {
  datastore: 'mongodb',
  tableName: 'poliklinik',
  // primaryKey: 'kdPoli',
  attributes: {
    kdPoli: {
      type: 'string',
      required: true,
      columnName: 'kd_poli',
    },
    nmPoli: { type: 'string', required: true, columnName: 'nm_poli' },
    registrasi: { type: 'number', required: true },
    registrasilama: { type: 'number', required: true },
    regPeriksa: {
      collection: 'regperiksa',
      via: 'kdPoli',
    },
  },
}
