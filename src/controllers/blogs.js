const models = require('../../models');
const {createFormatResponse} = require("../utils/libs");

const getAllBlogs = async (req, res) => {
    try{
        const blogs = await models.blog.findAll({
            include: [
                {
                    model: models.user,
                }
            ]
        })
        const formatResponse = createFormatResponse({status: "ok", code: 200, success: true, message: "Get all blogs successfully", data: {blogs} })
        return res.status(200).json(formatResponse)
    }catch (err){
        console.log(err)
        return res.status(500).json("Server error");
    }
}

const getBlogById = async (req, res) => {
    try{
        const blog = await models.blog.findOne({
            where: {id: req.params.id},
            include: [{
                model: models.user,
            }]
        })
        const formatResponse = createFormatResponse({status: "ok", code: 200, success: true, message: "Get blog successfully", data: {blog}})
        return res.status(200).json(formatResponse)
    }catch (err){
        return res.status(500).json("Server Error");
    }
}

const createBlog = async (req, res) => {
    try{
        const blog = await models.blog.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.decoded.id,
        })
        const formatResponse = createFormatResponse({status: "ok", code: 200, success: true, message: "Create blog successfully"});
        return res.status(200).json(formatResponse);
    }catch (err){
        return res.status(500).json("Server Error");
    }
}

const updateBlog = async (req, res) => {
    try{
        const blog = await models.blog.update({title: req.body.title, content: req.body.content},{where: {id: req.params.id}})
        const formatResponse = createFormatResponse({status: "ok", code: 200, success: true, message: "Update blog successfully"})
        return res.status(200).json(formatResponse)
    }catch (err){
        return res.status(500).json("Server Error");
    }

}

const deleteBlog = async (req, res) => {
    try{
        const blog = await models.blog.destroy({where: {id: req.params.id}})
        const formatResponse = createFormatResponse({status: "ok", code: 200, success: true, message: "Delete blog successfully"});
        return res.status(200).json(formatResponse);
    }catch(err){
        return res.status(500).json("Server Error");
    }

}

module.exports = {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog}