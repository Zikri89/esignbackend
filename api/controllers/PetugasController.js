module.exports = {
  find: async function (req, res) {
    try {
      const petugas = await Petugas.find()

      if (!petugas) {
        return res.notFound('Petugas not found')
      }

      return res.json(petugas)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const petugasId = req.param('id')
      const petugas = await Petugas.findOne({ id: petugasId })

      if (!petugas) {
        return res.notFound('Petugas not found')
      }

      return res.json(petugas)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const petugas = await Petugas.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!petugas) {
        return res.notFound('Petugas not created')
      }

      return res.json({
        message: 'Petugas created successfully',
        result: petugas,
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
      const petugasId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const petugas = await Petugas.update(
        { id: petugasId },
        updatedData
      ).fetch()

      if (!petugas || petugas.length === 0) {
        return res.notFound('Petugas not found')
      }

      return res.json({
        message: 'Petugas updated successfully',
        result: petugas[0],
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
      const petugasId = req.params.id
      if (!petugasId) {
        return res.badRequest('Petugas ID is required')
      }

      const petugas = await Petugas.updateOne({ id: petugasId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!petugas || petugas.length === 0) {
        return res.notFound('Petugas not found')
      }

      return res.json({
        message: 'Petugas deleted successfully',
        result: petugas[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const petugas = await Petugas.destroy({}).fetch()

      if (!petugas || petugas.length === 0) {
        return res.notFound('Petugas not found')
      }

      return res.json({
        message: 'Petugas deleted successfully',
        result: petugas[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
