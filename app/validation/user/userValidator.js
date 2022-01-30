const { validate } = require('../../../utils/request-validator');

const rules = {
  create: {
    name: { type: 'string', max: 50, empty: false },
    email: { type: 'email', max: 50, empty: false },
    phone: { type: 'string',  max: 20, empty: false },
    // user_role: { type: "number", positive: true, integer: true, empty: false },
    password: { type: 'string', min: 8, max: 190 ,empty: false },
    confirm_password: { type: "equal", field: "password"},
  },
  update: {
    name: { type: 'string', max: 50, empty: false },
    email: { type: 'email', max: 50, empty: false },
    phone: { type: 'string',  max: 20, empty: false },
    // user_role: { type: "number", positive: true, integer: true, empty: false },
    password: { type: 'string', min: 8, max: 190 ,empty: false },
    confirm_password: { type: "equal", field: "password"},
  },
};

const validateRequest = (req, ruleName) => {
  const rule = rules[ruleName];
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};




