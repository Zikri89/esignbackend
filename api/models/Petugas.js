module.exports = {
  tableName: 'petugas',
  primaryKey: 'nip',
  attributes: {
    nip: { type: 'string', required: true },
    nama: { type: 'string', required: true },
    jk: { type: 'string', isIn: ['L', 'P'], required: true },
    tmpLahir: { type: 'string', required: true, columnName: 'tmp_lahir' },
    tglLahir: {
      type: 'ref',
      columnType: 'date',
      required: true,
      columnName: 'tgl_lahir',
    },
    golDarah: {
      type: 'string',
      isIn: ['A', 'B', 'O', 'AB', '-'],
      required: true,
      columnName: 'gol_darah',
    },
    agama: { type: 'string', required: true },
    sttsNikah: {
      type: 'string',
      isIn: ['SINGLE', 'MENIKAH', 'JANDA', 'DUDA'],
      required: true,
      columnName: 'stts_nikah',
    },
    alamat: { type: 'string', required: true },
    kdJbtn: { type: 'string', required: true, columnName: 'kd_jbtn' },
    noTelp: { type: 'string', required: true, columnName: 'no_telp' },
    status: { type: 'string', isIn: ['0', '1'], required: true },
  },
}
