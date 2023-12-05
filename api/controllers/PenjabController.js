module.exports = {
  find: async function (req, res) {
    try {
      const penjab = await Penjab.find()

      if (!penjab) {
        return res.notFound('Penjab not found')
      }

      return res.json(penjab)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const penjabId = req.param('id')
      const penjab = await Penjab.findOne({ id: penjabId })

      if (!penjab) {
        return res.notFound('Penjab not found')
      }

      return res.json(penjab)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const penjab = await Penjab.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!penjab) {
        return res.notFound('Penjab not created')
      }

      return res.json({
        message: 'Penjab created successfully',
        result: penjab,
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
      const penjabId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const penjab = await Penjab.update({ id: penjabId }, updatedData).fetch()

      if (!penjab || penjab.length === 0) {
        return res.notFound('Penjab not found')
      }

      return res.json({
        message: 'Penjab updated successfully',
        result: penjab[0],
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
      const penjabId = req.params.id
      if (!penjabId) {
        return res.badRequest('Penjab ID is required')
      }

      const penjab = await Penjab.updateOne({ id: penjabId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!penjab || penjab.length === 0) {
        return res.notFound('Penjab not found')
      }

      return res.json({
        message: 'Penjab deleted successfully',
        result: penjab[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const penjab = await Penjab.destroy({}).fetch()

      if (!penjab || penjab.length === 0) {
        return res.notFound('Penjab not found')
      }

      return res.json({
        message: 'Penjab deleted successfully',
        result: penjab[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const penjabId = req.params.id
      const penjab = await Penjab.destroy({
        id: penjabId,
      }).fetch()

      if (!penjab || penjab.length === 0) {
        return res.notFound('Penjab not found')
      }

      return res.json({
        message: 'Penjab deleted successfully',
        result: penjab[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
