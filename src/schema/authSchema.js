const {body} = require("express-validator")

const authSchema = [
    body("username")
        .isLength({min: 3, max: 15})
        .withMessage("Username must be from 3 to 15 characters"),
    body("password")
        .isLength({min: 8, max: 64})
        .withMessage("Password must be from 8 to 64 characters"),
    body('firstName')
        .isLength({ min: 1, max: 20 })
        .withMessage('First name must be from 1 to 20 characters'),
    body('lastName')
        .isLength({ min: 1, max: 40 })
        .withMessage('Last name must be from 1 to 40 characters'),
]

module.exports = authSchema