module.exports = {
  attributes: {
    formName: {
      type: 'string',
      required: true,
    },
    formFields: {
      type: 'json',
      columnType: 'array',
      required: true,
      defaultsTo: [],
    },
  },
};
