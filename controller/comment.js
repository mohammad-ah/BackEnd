const Comment = require("../models/comment");

exports.createComment = async (req, res, next) => {
    try {
        await new Comment(req.body).save();
        res.status(200).send({message: 'Comment created successfully'})
    } catch(err) {
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        await Comment.findOneAndDelete({_id: req.body.id, userid: req.body.userid})
        res.status(200).send({message: 'Comment deleted successfully'})
    } catch(err) {
        next(err);
    }
};
