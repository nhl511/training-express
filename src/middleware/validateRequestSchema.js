const {validationResult} = require("express-validator");
const {createFormatResponse} = require("../utils/libs");
const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 400,
            success: true,
            errors: errors.array()
        })
        return res.status(400).json(formatResponse);
    }
    next();
}

module.exports = validateRequestSchema;