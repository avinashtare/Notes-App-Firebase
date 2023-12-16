const { check } = require("express-validator")

const validate_add_note = [
    check('title').isLength({ min: 1, max: 30 }).escape().withMessage('Invalid title'),
    check('content').isLength({ min: 5, max: 250 }).escape().withMessage('Invalid content'),
];


module.exports = { validate_add_note }