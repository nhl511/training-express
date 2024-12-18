const {createFormatResponse} = require("../utils/libs");
const checkAccountOwner = (req, res, next) => {
    if(req.decoded.id === req.params.id || req.decoded.isAdmin){
        next()
    }else{
        const formatResponse = createFormatResponse({status: 'error', code: 403, success: true, message: "Not have permissions"});
        return res.status(403).json(formatResponse)
    }
}

module.exports = checkAccountOwner;