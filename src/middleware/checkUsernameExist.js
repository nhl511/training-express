const models = require('../../models');
const {createFormatResponse} = require("../utils/libs");

const checkUsernameExist = (req, res, next) => {
    models.user.findOne({where: {username: req.body.username}})
        .then((user) => {
            if(user) {
                const formatResponse = createFormatResponse({
                    status: 'OK',
                    code: 400,
                    success: true,
                    errors: {msg: "Username is already exist"}
                })
                return res.status(400).json(formatResponse);
            }
            next()
        })
}

module.exports = checkUsernameExist