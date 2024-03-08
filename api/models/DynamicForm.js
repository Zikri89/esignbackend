module.exports = {
  tableName: 'zk_dynamic_form',
  attributes: {
    formManager: {
      type: 'string',
      columnName: 'form_manager',
    },
    formFields: {
      type: 'json',
      required: true,
      columnName: 'form_field',
    },
    formulir: {
      type: 'json',
      columnName: 'formulir',
    },
  },
};
