const { check } = require("express-validator")

const validateNewUser = [
    check('email').isLength({ min: 5, max: 100 }).isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6, max: 500 }).withMessage('Password must be at least 8 characters long'),
    check("first").isLength({ min: 3, max: 30 }).isAlpha().withMessage("Invalid First Name"),
    check("last").isLength({ min: 3, max: 30 }).isAlpha().withMessage("Invalid last Name"),
    check("phone").replace("+", "").toInt().isLength({ min: 10, max: 12 }).isNumeric().withMessage("Invalid Mobile Number"),
    check("company").isString().isLength({ max: 30 }).isAlpha().withMessage("Invaid Company Name")
];

const validateLoginUser = [
    check('email').isLength({ min: 5, max: 100 }).isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6, max: 500 }).withMessage('Password must be at least 8 characters long')
]

module.exports = { validateNewUser, validateLoginUser }