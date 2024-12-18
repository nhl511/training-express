const models = require('../../models');
const {createFormatResponse} = require("../utils/libs");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
    try{
        const users = await models.user.findAll();
        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 200,
            success: true,
            message: "Get All Users successfully",
            data: {users},
            count: users.length
        })
        return res.status(200).json(formatResponse)
    }catch (err) {
        console.log(err)
        return res.status(500).json("Server Error");
    }
}

const getUserById = async (req, res) => {
    try{
        const user = await models.user.findByPk(req.params.id);
        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 200,
            success: true,
            message: "Get user successfully",
            data: {user},
        })
        return res.status(200).json(formatResponse)
    }catch (err) {
        return res.status(500).json("Server Error");
    }
}

const createUser = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await models.user.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin,
        })
        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 200,
            success: true,
            message: "Create user successfully",
        })
        return res.status(200).json(formatResponse);
    }catch(err){
        return res.status(500).json("Server Error");
    }
}

const updateUser = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await models.user.update({
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin,
        },{
            where: {id: req.params.id},
        })

        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 200,
            success: true,
            message: "Update user successfully",
        })
        return res.status(200).json(formatResponse);

    }catch (err){
        return res.status(500).json("Server Error");
    }
}

const deleteUser = async (req, res) => {
    try{
        const user = await models.user.destroy({
            where: {id: req.params.id}
        })
        const formatResponse = createFormatResponse({
            status: 'OK',
            code: 200,
            success: true,
            message: "Delete user successfully",
        })
        return res.status(200).json(formatResponse);
    }catch(err){
        return res.status(500).json("Server Error");
    }
}

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser}