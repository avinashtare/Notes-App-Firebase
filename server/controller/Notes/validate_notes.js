const { check } = require("express-validator")

const validate_add_note = [
    check('title').isLength({ min: 1, max: 30 }).escape().withMessage('Invalid title'),
    check('content').isLength({ min: 5, max: 250 }).escape().withMessage('Invalid content'),
];

const validate_delete_note = [
    check('noteId').isLength({ min: 1, max: 1000 }).withMessage('Invalid title'),
];

const validate_update_note = [
    check('noteId').isLength({ min: 1, max: 1000 }).withMessage('Invalid title'),
    check('title').isLength({ min: 1, max: 30 }).optional(true).escape().withMessage('Invalid title'),
    check('content').isLength({ min: 5, max: 250 }).optional(true).escape().withMessage('Invalid content'),
    check('active').isBoolean().optional(true).withMessage('Invalid content'),
];


module.exports = { validate_add_note, validate_delete_note,validate_update_note }