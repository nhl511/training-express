const express = require('express');
const router = express.Router();
const {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog} = require('../controllers/blogs');
const {createBlogSchema, updateBlogSchema} = require('../schema/blogSchema');
const validateRqeustSchema = require('../middleware/validateRequestSchema');
const checkExist = require('../middleware/checkExist');
const checkCredentials = require('../middleware/checkCredentials');
const checkBlogOwner = require('../middleware/checkBlogOwner');

router.get('/', getAllBlogs );
router.get('/:id', checkExist('blog'), getBlogById);
router.post('/', createBlogSchema, validateRqeustSchema, checkCredentials, createBlog)
router.put('/:id', updateBlogSchema, validateRqeustSchema, checkExist('blog'), checkCredentials, checkBlogOwner, updateBlog);
router.delete('/:id', checkExist('blog'), checkCredentials, checkBlogOwner, deleteBlog);

module.exports = router