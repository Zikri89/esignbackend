module.exports = {
  find: async function (req, res) {
    try {
      const dynamicForm = await DynamicForm.find()

      if (!dynamicForm) {
        return res.notFound('DynamicForm not found')
      }

      return res.json(dynamicForm)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const dynamicFormId = req.param('id')
      const dynamicForm = await DynamicForm.findOne({ id: dynamicFormId })

      if (!dynamicForm) {
        return res.notFound('DynamicForm not found')
      }

      return res.json(dynamicForm)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const dynamicForm = await DynamicForm.create(
        keys.reduce((acc, key) => {
          acc[key] =  req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!dynamicForm) {
        return res.notFound('DynamicForm not created')
      }

      return res.json({
        message: 'DynamicForm created successfully',
        result: dynamicForm,
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
      const dynamicFormId = req.param('id');

      const existingData = await DynamicForm.findOne({ id: dynamicFormId });

      if (!existingData) {
        return res.notFound('DynamicForm not found');
      }

      const updatedData = {
        ...existingData,
        formulir: req.body.formulir,
      };

      const dynamicForm = await DynamicForm.updateOne(
        { id: dynamicFormId },
        updatedData
      );

      return res.json({
        message: 'DynamicForm updated successfully',
        result: dynamicForm,
      });
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' });
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

  softDelete: async function (req, res) {
    try {
      const dynamicFormId = req.params.id
      if (!dynamicFormId) {
        return res.badRequest('DynamicForm ID is required')
      }

      const dynamicForm = await DynamicForm.updateOne({ id: dynamicFormId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!dynamicForm || dynamicForm.length === 0) {
        return res.notFound('DynamicForm not found')
      }

      return res.json({
        message: 'DynamicForm deleted successfully',
        result: dynamicForm[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const dynamicForm = await DynamicForm.destroy({}).fetch()

      if (!dynamicForm || dynamicForm.length === 0) {
        return res.notFound('DynamicForm not found')
      }

      return res.json({
        message: 'DynamicForm deleted successfully',
        result: dynamicForm[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const dynamicFormId = req.params.id
      const dynamicForm = await DynamicForm.destroy({
        id: dynamicFormId,
      }).fetch()

      if (!dynamicForm || dynamicForm.length === 0) {
        return res.notFound('DynamicForm not found')
      }

      return res.json({
        message: 'DynamicForm deleted successfully',
        result: dynamicForm[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
