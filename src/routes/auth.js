const express = require('express');
const { register, login, logout} = require('../controllers/auth')
const authSchema = require('../schema/authSchema');
const validateRequestSchema = require("../middleware/validateRequestSchema")
const checkUsernameExists = require("../middleware/checkUsernameExist");


const router = express.Router();

router.post('/register', authSchema, validateRequestSchema, checkUsernameExists, register);
router.post('/login', login);
router.get('/logout', logout)

module.exports = router;