const { validate } = require('../../../utils/request-validator');

const rules = {
  create: {
    name: { type: 'string', max: 50, empty: false },
    position: { type: 'string', integer: true, max: 50, empty: false },
    show_home: { type: 'enum', values: ['Yes', 'No'], empty: true },
    parentCategory: {type: 'string', integer: true, empty: true},
    categoryVariant: {type: 'array', items: 'string', integer: true, empty: true},
  },
  update: {
    name: { type: 'string', max: 50, empty: false },
    email: { type: 'email', max: 50, empty: false },
    phone: { type: 'string',  max: 20, empty: false },
  },
};

const validateRequest = (req, ruleName) => {
  const rule = rules[ruleName];
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};




