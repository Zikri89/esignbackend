module.exports = {
  find: async function (req, res) {
    try {
      const pasien = await Pasien.find()

      if (!pasien) {
        return res.notFound('Pasien not found')
      }

      return res.json(pasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const pasienId = req.param('id')
      const pasien = await Pasien.findOne({ noRkmMedis: pasienId })

      if (!pasien) {
        return res.notFound('Pasien not found')
      }

      return res.json(pasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const pasien = await Pasien.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!pasien) {
        return res.notFound('Pasien not created')
      }

      return res.json({
        message: 'Pasien created successfully',
        result: pasien,
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
      const pasienId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const pasien = await Pasien.update({ id: pasienId }, updatedData).fetch()

      if (!pasien || pasien.length === 0) {
        return res.notFound('Pasien not found')
      }

      return res.json({
        message: 'Pasien updated successfully',
        result: pasien[0],
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
      const pasienId = req.params.id
      if (!pasienId) {
        return res.badRequest('Pasien ID is required')
      }

      const pasien = await Pasien.updateOne({ id: pasienId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!pasien || pasien.length === 0) {
        return res.notFound('Pasien not found')
      }

      return res.json({
        message: 'Pasien deleted successfully',
        result: pasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const pasien = await Pasien.destroy({}).fetch()

      if (!pasien || pasien.length === 0) {
        return res.notFound('Pasien not found')
      }

      return res.json({
        message: 'Pasien deleted successfully',
        result: pasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const pasienId = req.params.id
      const pasien = await Pasien.destroy({
        id: pasienId,
      }).fetch()

      if (!pasien || pasien.length === 0) {
        return res.notFound('Pasien not found')
      }

      return res.json({
        message: 'Pasien deleted successfully',
        result: pasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
