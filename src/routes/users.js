var express = require('express');
const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/users");
const {createUserSchema, updateUserSchema} = require("../schema/userSchema");
const validateRequestSchema = require("../middleware/validateRequestSchema")
const checkExist = require("../middleware/checkExist")
const checkUsernameExists = require("../middleware/checkUsernameExist")
const checkAdmin = require("../middleware/checkAdmin")
const checkCredentials = require("../middleware/checkCredentials")
const checkAccountOwner = require("../middleware/checkAccountOwner")

var router = express.Router();

/* GET users listing. */
router.get("/", checkAdmin, getAllUsers)

router.get("/:id", checkExist("user"), checkCredentials, checkAccountOwner, getUserById)

router.post("/", checkAdmin, createUserSchema, validateRequestSchema, checkUsernameExists,  createUser)

router.put("/:id", checkAdmin, updateUserSchema, validateRequestSchema, checkExist("user"), updateUser)

router.delete("/:id", checkAdmin, checkExist("user"), deleteUser)

module.exports = router;
