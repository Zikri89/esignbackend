module.exports = {
  tableName: 'dynamic_form',
  attributes: {
    formFields: {
      type: 'json',
      required: true,
      columnName: 'form_field',
    },
  },
};
