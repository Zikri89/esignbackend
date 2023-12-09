module.exports = {
  find: async function (req, res) {
    try {
      const formDataPasien = await FormDataPasien.find({ isDeleted: false })

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json(formDataPasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const formDataPasienId = req.param('id')
      const formDataPasien = await FormDataPasien.findOne({
        id: formDataPasienId,
        isDeleted: false,
      })

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json(formDataPasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const formDataPasien = await FormDataPasien.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not created')
      }

      return res.json({
        message: 'Form Data Pasien created successfully',
        result: formDataPasien,
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
      const formDataPasienId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const formDataPasien = await FormDataPasien.update(
        { id: formDataPasienId },
        updatedData
      ).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien updated successfully',
        result: formDataPasien[0],
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
      const formDataPasienId = req.params.id
      if (!formDataPasienId) {
        return res.badRequest('Form Data Pasien ID is required')
      }

      const formDataPasien = await FormDataPasien.update({ id: formDataPasienId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
          staus: 'trash',
        })
        .fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const formDataPasien = await FormDataPasien.destroy({}).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const formDataPasienId = req.params.id
      const formDataPasien = await FormDataPasien.destroy({
        id: formDataPasienId,
      }).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
