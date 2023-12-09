module.exports = {
  find: async function (req, res) {
    try {
      const formManager = await FormManager.find({ isDeleted: false }).populate('dynamicForm')

      if (!formManager) {
        return res.notFound('Form Manager not found')
      }

      return res.json(formManager)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const formManagerId = req.param('id')
      const formManager = await FormManager.findOne({
        id: formManagerId,
        isDeleted: false,
      }).populate('dynamicForm')

      if (!formManager) {
        return res.notFound('Form Manager not found')
      }

      return res.json(formManager)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const formManager = await FormManager.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!formManager) {
        return res.notFound('Form Manager not created')
      }

      return res.json({
        message: 'Form Manager created successfully',
        result: formManager,
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
      const formManagerId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const formManager = await FormManager.update(
        { id: formManagerId },
        updatedData
      ).fetch()

      if (!formManager || formManager.length === 0) {
        return res.notFound('Form Manager not found')
      }

      return res.json({
        message: 'Form Manager updated successfully',
        result: formManager[0],
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
      const formManagerId = req.params.id
      if (!formManagerId) {
        return res.badRequest('Form Manager ID is required')
      }

      const formManager = await FormManager.update({ id: formManagerId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
          staus: 'trash',
        })
        .fetch()

      if (!formManager || formManager.length === 0) {
        return res.notFound('Form Manager not found')
      }

      return res.json({
        message: 'Form Manager deleted successfully',
        result: formManager[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const formManager = await FormManager.destroy({}).fetch()

      if (!formManager || formManager.length === 0) {
        return res.notFound('Form Manager not found')
      }

      return res.json({
        message: 'Form Manager deleted successfully',
        result: formManager[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const formManagerId = req.params.id
      const formManager = await FormManager.destroy({
        id: formManagerId,
      }).fetch()

      if (!formManager || formManager.length === 0) {
        return res.notFound('Form Manager not found')
      }

      return res.json({
        message: 'Form Manager deleted successfully',
        result: formManager[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
