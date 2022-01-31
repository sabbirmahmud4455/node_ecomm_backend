const { validate } = require('../../../utils/request-validator');

const rules = {
    login: {
        email: { type: 'email', max: 50, empty: false },
        password: { type: 'string', min: 8, max: 190 ,empty: false }, 
    }
}

const validateRequest = (req, ruleName) => {
    const rule = rules[ruleName];
    return validate(req, rule);
}

module.exports = {
    validateRequest,
}
