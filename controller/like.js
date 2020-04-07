const Like = require("../models/like");

exports.likePost = async (req, res, next) => {
    try {
        await new Like(req.body).save();
        res.status(200).send({message: 'Liked successfully'})
    } catch(err) {
        next(err);
    }
};

exports.dislikePost = async (req, res, next) => {
    try {
        await Like.findOneAndDelete({postid: req.body.postid, userid: req.body.userid})
        res.status(200).send({message: 'Liked removed successfully'})
    } catch(err) {
        next(err);
    }
};
