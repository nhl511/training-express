const models = require("../../models")
const {createFormatResponse} = require("../utils/libs");

const checkBlogOwner = async (req, res, next) => {
    const blog = await models.blog.findOne({where: {id: req.params.id, userId: req.decoded.id}})
    if(!blog){
        const formatResponse = createFormatResponse({status: "ok", code: 403, success: true, message: "Not have permission"})
        return res.status(403).json(formatResponse)
    }
    next()
}

module.exports = checkBlogOwner