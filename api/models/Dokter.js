module.exports = {
  tableName: 'dokter',
  // primaryKey: 'kdDokter',
  attributes: {
    kdDokter: {
      type: 'string',
      required: true,
      columnName: 'kd_dokter',
    },
    nmDokter: { type: 'string', required: true, columnName: 'nm_dokter' },
    jk: { type: 'string', isIn: ['L', 'P'], required: true },
    tmpLahir: { type: 'string', required: true, columnName: 'tmp_lahir' },
    tglLahir: {
      type: 'ref',
      columnType: 'date',
      required: true,
      columnName: 'tgl_lahir',
    },
    golDrh: {
      type: 'string',
      isIn: ['A', 'B', 'O', 'AB', '-'],
      required: true,
      columnName: 'gol_drh',
    },
    agama: { type: 'string', required: true },
    almtTgl: { type: 'string', required: true, columnName: 'almt_tgl' },
    noTelp: { type: 'string', required: true, columnName: 'no_telp' },
    sttsNikah: {
      type: 'string',
      isIn: ['SINGLE', 'MENIKAH', 'JANDA', 'DUDA', '-'],
      required: true,
      columnName: 'stts_nikah',
    },
    kdSps: { type: 'string', required: true, columnName: 'kd_sps' },
    alumni: { type: 'string', required: true },
    noIjnPraktek: {
      type: 'string',
      required: true,
      columnName: 'no_ijn_praktek',
    },
    status: { type: 'string', isIn: ['0', '1'], required: true },
    regPeriksa: {
      collection: 'regperiksa',
      via: 'kdDokter',
    },
  },
}
