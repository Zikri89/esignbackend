module.exports = {
  tableName: 'dynamic_form',
  attributes: {
    formName: {
      type: 'string',
      required: true,
      columnName: 'form_name',
    },
    formFields: {
      type: 'json',
      required: true,
      columnName: 'form_field',
    },
  },
};
