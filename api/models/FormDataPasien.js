module.exports = {

  attributes: {
    noRawat: {
      type: 'string',
      required: true,
    },
    dataJson: {
      type: 'json',
      columnType: 'json',
      required: true,
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
      defaultsTo: false,
    },
    deletedBy: {
      type: 'string',
      columnName: 'deletedBy',
    },
    deletedAt: {
      type: 'ref',
      columnName: 'deletedAt',
    },
    status: {
      type: 'string',
      columnName: 'status',
    },
  }
};
