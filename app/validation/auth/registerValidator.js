const { validate } = require('../../../utils/request-validator');

const rules = {
    name: { type: 'string', max: 50, empty: false },
    email: { type: 'email', max: 50, empty: false },
    phone: { type: 'string',  max: 20, empty: true },
    password: { type: 'string', min: 8, max: 190 ,empty: false },
    confirm_password: { type: "equal", field: "password"},
};

const validateRequest = (req) => {
  const rule = rules;
  return validate(req, rule);
};

module.exports = {
  validateRequest,
};