const {createFormatResponse} = require("../utils/libs");
const jwt = require("jsonwebtoken");

const checkCredentials = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        const formatResponse = createFormatResponse({status: 'error', code: 401, success: true, message: "Invalid credentials"});
        return res.status(401).json(formatResponse);
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        if (decoded.id) {
            next();
        }
    }catch(err){
        const formatResponse = createFormatResponse({status: 'error', code: 401, success: true, message: "Invalid credentials"});
        return res.status(401).json(formatResponse);
    }
}

module.exports = checkCredentials;