module.exports = {
  find: async function (req, res) {
    try {
      const user = await User.find()

      if (!user) {
        return res.notFound('User not found')
      }

      return res.json(user)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const userId = req.param('id')
      const user = await User.findOne({ id: userId })

      if (!user) {
        return res.notFound('User not found')
      }

      return res.json(user)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const user = await User.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!user) {
        return res.notFound('User not created')
      }

      return res.json({
        message: 'User created successfully',
        result: user,
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
      const userId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const user = await User.update({ id: userId }, updatedData).fetch()

      if (!user || user.length === 0) {
        return res.notFound('User not found')
      }

      return res.json({
        message: 'User updated successfully',
        result: user[0],
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
      const userId = req.params.id
      if (!userId) {
        return res.badRequest('User ID is required')
      }

      const user = await User.updateOne({ id: userId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!user || user.length === 0) {
        return res.notFound('User not found')
      }

      return res.json({
        message: 'User deleted successfully',
        result: user[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const user = await User.destroy({}).fetch()

      if (!user || user.length === 0) {
        return res.notFound('User not found')
      }

      return res.json({
        message: 'User deleted successfully',
        result: user[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
