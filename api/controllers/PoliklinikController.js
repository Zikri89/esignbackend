module.exports = {
  find: async function (req, res) {
    try {
      const poliklinik = await Poliklinik.find()

      if (!poliklinik) {
        return res.notFound('Poliklinik not found')
      }

      return res.json(poliklinik)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const poliklinikId = req.param('id')
      const poliklinik = await Poliklinik.findOne({ id: poliklinikId })

      if (!poliklinik) {
        return res.notFound('Poliklinik not found')
      }

      return res.json(poliklinik)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const poliklinik = await Poliklinik.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!poliklinik) {
        return res.notFound('Poliklinik not created')
      }

      return res.json({
        message: 'Poliklinik created successfully',
        result: poliklinik,
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
      const poliklinikId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const poliklinik = await Poliklinik.update(
        { id: poliklinikId },
        updatedData
      ).fetch()

      if (!poliklinik || poliklinik.length === 0) {
        return res.notFound('Poliklinik not found')
      }

      return res.json({
        message: 'Poliklinik updated successfully',
        result: poliklinik[0],
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
      const poliklinikId = req.params.id
      if (!poliklinikId) {
        return res.badRequest('Poliklinik ID is required')
      }

      const poliklinik = await Poliklinik.updateOne({ id: poliklinikId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!poliklinik || poliklinik.length === 0) {
        return res.notFound('Poliklinik not found')
      }

      return res.json({
        message: 'Poliklinik deleted successfully',
        result: poliklinik[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const poliklinik = await Poliklinik.destroy({}).fetch()

      if (!poliklinik || poliklinik.length === 0) {
        return res.notFound('Poliklinik not found')
      }

      return res.json({
        message: 'Poliklinik deleted successfully',
        result: poliklinik[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const poliklinikId = req.params.id
      const poliklinik = await Poliklinik.destroy({
        id: poliklinikId,
      }).fetch()

      if (!poliklinik || poliklinik.length === 0) {
        return res.notFound('Poliklinik not found')
      }

      return res.json({
        message: 'Poliklinik deleted successfully',
        result: poliklinik[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
