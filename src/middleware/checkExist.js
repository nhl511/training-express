const models = require('../../models');
const {createFormatResponse} = require("../utils/libs");

const checkExist = (model) => {
    return (req, res, next)=> {
        let myModel
        switch (true) {
            case model === "user":
                myModel = models.user;
                break;
            case model === "blog":
                myModel = models.blog;
                break;
        }
        myModel.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    const formatResponse = createFormatResponse({
                        status: 'OK',
                        code: 404,
                        success: true,
                        errors: {msg: `${model} not found`}
                    })
                    return res.status(404).json(formatResponse);
                }

                next()
            })
    }
}

module.exports = checkExist