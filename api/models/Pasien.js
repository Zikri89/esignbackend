module.exports = {
  datastore: 'mongodb',
  tableName: 'pasien',
  attributes: {
    noRkmMedis: { type: 'string', required: true, columnName: 'no_rkm_medis' },
    nmPasien: { type: 'string', required: true, columnName: 'nm_pasien' },
    noKtp: { type: 'string', required: true, columnName: 'no_ktp' },
    jk: { type: 'string', isIn: ['L', 'P'], required: true },
    tmpLahir: { type: 'string', required: true, columnName: 'tmp_lahir' },
    tglLahir: {
      type: 'ref',
      columnType: 'date',
      required: true,
      columnName: 'tgl_lahir',
    },
    alamat: { type: 'string', required: true },
    sttsNikah: {
      type: 'string',
      isIn: ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA'],
      required: true,
      columnName: 'stts_nikah',
    },
    agama: { type: 'string', required: true },
    noTlp: { type: 'string', required: true, columnName: 'no_tlp' },
    noPeserta: { type: 'string', required: true, columnName: 'no_peserta' },
  },
}
