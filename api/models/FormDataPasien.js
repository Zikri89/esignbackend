module.exports = {

  attributes: {
    noRkmMedis: {
      type: 'string',
      required: true,
    },
    dataJson: {
      type: 'json',
      columnType: 'json',
      required: true,
    },
  }
};
