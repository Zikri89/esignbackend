module.exports = {
  find: async function (req, res) {
    try {
      const dokter = await Dokter.find()

      if (!dokter) {
        return res.notFound('Dokter not found')
      }

      return res.json(dokter)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const dokterId = req.param('id')
      const dokter = await Dokter.findOne({ id: dokterId })

      if (!dokter) {
        return res.notFound('Dokter not found')
      }

      return res.json(dokter)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const dokter = await Dokter.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!dokter) {
        return res.notFound('Dokter not created')
      }

      return res.json({
        message: 'Dokter created successfully',
        result: dokter,
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
      const dokterId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const dokter = await Dokter.update({ id: dokterId }, updatedData).fetch()

      if (!dokter || dokter.length === 0) {
        return res.notFound('Dokter not found')
      }

      return res.json({
        message: 'Dokter updated successfully',
        result: dokter[0],
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
      const dokterId = req.params.id
      if (!dokterId) {
        return res.badRequest('Dokter ID is required')
      }

      const dokter = await Dokter.updateOne({ id: dokterId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!dokter || dokter.length === 0) {
        return res.notFound('Dokter not found')
      }

      return res.json({
        message: 'Dokter deleted successfully',
        result: dokter[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const dokter = await Dokter.destroy({}).fetch()

      if (!dokter || dokter.length === 0) {
        return res.notFound('Dokter not found')
      }

      return res.json({
        message: 'Dokter deleted successfully',
        result: dokter[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
