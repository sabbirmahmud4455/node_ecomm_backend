const { validate } = require('../../../utils/request-validator');

const roles = {
    //
}

const validateRequest = (req, res) => {
    const rule = rules[ruleName];
    return validate(req, rule);
}

module.exports = {
    validateRequest,
}
