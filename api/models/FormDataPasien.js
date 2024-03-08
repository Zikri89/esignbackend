module.exports = {
  tableName: 'zk_formdatapasien',
  attributes: {
    noRawat: {
      type: 'string',
      columnName: 'no_rawat',
    },
    formulir: {
      type: 'string',
      columnName: 'formulir',
    },
    dataJson: {
      type: 'json',
      columnName: 'data_json',
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
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
