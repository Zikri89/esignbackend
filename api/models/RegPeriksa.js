module.exports = {
  tableName: 'reg_periksa',
  attributes: {
    no_reg: { type: 'string' },
    no_rawat: { type: 'string', required: true, unique: true },
    tgl_registrasi: { type: 'ref', columnType: 'date' },
    jam_reg: { type: 'ref', columnType: 'time' },
    kd_dokter: { type: 'string' },
    no_rkm_medis: { type: 'string' },
    kd_poli: { type: 'string' },
    p_jawab: { type: 'string' },
    almt_pj: { type: 'string' },
    hubunganpj: { type: 'string' },
    biaya_reg: { type: 'number' },
    stts: { type: 'string', isIn: ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa'] },
    stts_daftar: { type: 'string', isIn: ['-', 'Lama', 'Baru'], required: true },
    status_lanjut: { type: 'string', isIn: ['Ralan', 'Ranap'], required: true },
    kd_pj: { type: 'string', required: true },
    umurdaftar: { type: 'number' },
    sttsumur: { type: 'string', isIn: ['Th', 'Bl', 'Hr'] },
    status_bayar: { type: 'string', isIn: ['Sudah Bayar', 'Belum Bayar'], required: true },
    status_poli: { type: 'string', isIn: ['Lama', 'Baru'], required: true },
  },

  // Indexes
  indexes: [
    { attributes: { no_rawat: 1 }, options: { unique: true } },
  ],
};
