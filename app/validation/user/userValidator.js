const { validate } = require('../../../utils/request-validator');

const rules = {
  create: {
    userName: { type: 'string', empty: false },
    password: { type: 'string', empty: false },
  },
  update: {
    userName: { type: 'string', empty: false },
    password: { type: 'string', empty: false },
  },
};

const validateRequest = (req, ruleName) => {
  const rule = rules[ruleName];
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};




