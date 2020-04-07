const Post = require('../models/post');
const User = require('../models/user');


exports.createPost = async (req, res, next) => {
  try {
      await new Post(req.body).save();
      res.status(200).send({message: 'Post created successfully'})
  } catch(err) {
      next(err);
  }
};

exports.getFollowingPosts = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const limit = parseInt(req.params.limit);
        const skip = parseInt(req.params.skip);

        const user = await User.findById(userId);

        console.log(user);

        const list = await Post.aggregate([
            {
                '$match': {
                    'userid': {
                        '$in': user.following
                    },
                    'unhealthy': false
                }
            },
            {
                '$lookup': {
                    'from': 'comments',
                    'localField': '_id',
                    'foreignField': 'postid',
                    'as': 'comments'
                }
            },
            {
                '$lookup': {
                    'from': 'likes',
                    'localField': '_id',
                    'foreignField': 'postid',
                    'as': 'likes'
                }
            }
        ]).sort({ createdat: 1 }).skip(skip).limit(limit);

        const result = await User.populate(list, {path: 'comments.userid likes.userid userid', select: '_id email username'});

        res.status(200).send({ message: "Posts got successfully.", posts: result});
    } catch (err) {
        next(err);
    }
};

exports.searchPosts = async (req, res, next) => {
    const userId = req.params.id;
    const search = req.params.search;
    const limit = parseInt(req.params.limit);
    const skip = parseInt(req.params.skip);


    const user = await User.findById(userId);
    console.log('params', req.params, user);

    try {
        const posts = await Post.find(
            {
                text: {
                    '$regex': search, '$options': "i"
                },
                userid: {
                    '$in': [user.following, userId]
                }
            }).sort({createdat: -1}).skip(skip).limit(limit);

        res.status(200).send({message: "Posts got successfully.", posts: posts});
    } catch (err) {
        next(err);
    }
};
