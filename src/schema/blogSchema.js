const {body} = require('express-validator')

const createBlogSchema = [
    body("title")
        .isLength({ min: 1, max: 255})
        .withMessage('Title must be from 1 to 255 characters.'),
    body("content")
        .isLength({ min: 1 })
        .withMessage('content is required'),
]

const updateBlogSchema = [
    body("title")
        .isLength({ min: 1, max: 255})
        .withMessage('Title must be from 1 to 255 characters.'),
    body("content")
        .isLength({ min: 1 })
        .withMessage('content is required'),
]

module.exports = {createBlogSchema, updateBlogSchema}