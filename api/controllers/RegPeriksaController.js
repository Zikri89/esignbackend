module.exports = {
  patientList: async function (req, res){
    try {
      const result = await RegPeriksa.find({
        where: {
          no_rkm_medis: { '!=': null },
          kd_pj: { '!=': null },
          kd_poli: { '!=': null },
          kd_dokter: { '!=': null },
          tgl_registrasi: { '>=': new Date(new Date() - 1) },
        },
        select: [
          'tgl_registrasi',
          'jam_reg',
          'no_reg as nomor_antrian',
          'no_rkm_medis',
          'umurdaftar',
          'sttsumur',
          'png_jawab',
          'nm_poli',
          'nm_dokter',
          'no_rawat',
          'stts',
          'biaya_reg',
          'kd_dokter',
          'kd_poli',
        ],
        groupBy: ['no_rawat'],
      });

      return res.json(result);
    } catch (error) {
      return res.serverError(error);
    }
  },

  find: async function (req, res) {
    try {
      const regPeriksa = await RegPeriksa.find()
        .populate('kdDokter')
        .populate('kdPj')
        .populate('kdPoli')

      if (!regPeriksa) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json(regPeriksa)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const regPeriksaId = req.param('id')
      const regPeriksa = await RegPeriksa.findOne({ id: regPeriksaId })

      if (!regPeriksa) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json(regPeriksa)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const regPeriksa = await RegPeriksa.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!regPeriksa) {
        return res.notFound('RegPeriksa not created')
      }

      return res.json({
        message: 'RegPeriksa created successfully',
        result: regPeriksa,
      })
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' })
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' })
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const regPeriksaId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const regPeriksa = await RegPeriksa.update(
        { id: regPeriksaId },
        updatedData
      ).fetch()

      if (!regPeriksa || regPeriksa.length === 0) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json({
        message: 'RegPeriksa updated successfully',
        result: regPeriksa[0],
      })
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' })
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' })
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },

  softDelete: async function (req, res) {
    try {
      const regPeriksaId = req.params.id
      if (!regPeriksaId) {
        return res.badRequest('RegPeriksa ID is required')
      }

      const regPeriksa = await RegPeriksa.updateOne({ id: regPeriksaId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!regPeriksa || regPeriksa.length === 0) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json({
        message: 'RegPeriksa deleted successfully',
        result: regPeriksa[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const regPeriksa = await RegPeriksa.destroy({}).fetch()

      if (!regPeriksa || regPeriksa.length === 0) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json({
        message: 'RegPeriksa deleted successfully',
        result: regPeriksa[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const regPeriksaId = req.params.id
      const regPeriksa = await RegPeriksa.destroy({
        id: regPeriksaId,
      }).fetch()

      if (!regPeriksa || regPeriksa.length === 0) {
        return res.notFound('RegPeriksa not found')
      }

      return res.json({
        message: 'RegPeriksa deleted successfully',
        result: regPeriksa[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
