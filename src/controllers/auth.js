const models = require('../../models');
const {createFormatResponse} = require("../utils/libs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await models.user.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const formatResponse = createFormatResponse({status: 'OK', code: 200, success: true, message: "Register account successfully"});
        return res.status(200).json(formatResponse);
    }catch(err){
        return res.status(500).json("Server Error");
    }
}

const login = async (req, res) => {
    try {
        const user = await models.user.findOne({where: {username: req.body.username}})
        if(!user){
            const formatResponse = createFormatResponse({status: 'error', code: 401, message: "Wrong username or password"});
            return res.status(401).json(formatResponse);
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            const formatResponse = createFormatResponse({status: 'error', code: 401, message: "Wrong username or password"});
            return res.status(401).json(formatResponse);
        }
        const accessToken = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)

        const formatResponse = createFormatResponse({status: 'OK', code: 200, success: true, message: "Login Successfully", accessToken});
        return res.status(200).json(formatResponse);

    }catch (err){
        console.log(err)
        return res.status(500).json("Server Error");
    }
}

const logout = async (req, res) => {
    res.clearCookie('accessToken');
    const formatResponse = createFormatResponse({status: 'OK', code: 200, success: true, message: "Logout Successfully"});
    return res.status(200).json(formatResponse);
}

module.exports = {register, login, logout};