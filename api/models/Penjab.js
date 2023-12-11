module.exports = {
  tableName: 'penjab',
  primaryKey: 'kdPj',
  attributes: {
    kdPj: {
      type: 'string',
      required: true,
      columnName: 'kd_pj',
    },
    pngJawab: { type: 'string', required: true, columnName: 'png_jawab' },
    regPeriksa: {
      collection: 'regperiksa',
      via: 'kdPj',
    },
  },
}
