const Post = require('../models/post');
const User = require('../models/user');
const multiparty = require('multiparty');
const fs = require('fs')

exports.createPost = async (req, res, next) => {
  try {
      // console.log(req.body);
      // console.log('start');
      let body = {};
      let post = null;

      let file = null;
      let form = new multiparty.Form();
      form.parse(req, async function(err, fields, files) {
          console.log('backend');

          body['userid'] = fields.userid[0];
          if (fields.hasOwnProperty('text')) {
              body['text'] = fields.text[0];
          }
          body['notifyusers'] = fields.notifyusers[0];

          if (files.hasOwnProperty('image')) {
              file = files.image[0];

              var tmp_path = file.path;
              // console.log(tmp_path)
              /** The original name of the uploaded file
               stored in the variable "originalname". **/
              var target_path = 'node_modules/public/' + file.originalFilename;

              body['img'] = file.originalFilename;

              /** A better way to copy the uploaded file. **/
              var src = fs.createReadStream(tmp_path);
              var dest = fs.createWriteStream(target_path);
              src.pipe(dest);
              src.on('end', async function () {
                  post = await new Post(body).save();
                  const res = post.populate(
                      {path: 'userid', select: '_id email username'}
                  );
                  console.log(res)
                  res.status(200).send({message: 'Post created successfully', post: res});
              });
              src.on('error', function (err) {
                  next(err);
              });
          } else {
              post = await new Post(body).save();
              const res = post.populate(
                  {path: 'userid', select: '_id email username'}
              );
              console.log(res)
              res.status(200).send({message: 'Post created successfully', post: res});
          }
      });
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

        let usersIds = user.following;
            usersIds.push(userId);

        const list = await Post.aggregate([
            {
                '$match': {
                    'userid': {
                        '$in': usersIds
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
        ]).sort({ createdat: -1 }).skip(skip).limit(limit);

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

exports.removePost = async (req, res, next) => {
    const postId = req.body.id;

    try {
        await Post.deleteOne(
            {
                '_id': postId
            });

        res.status(200).send({message: "Post deleted successfully."});
    } catch (err) {
        next(err);
    }
};
