const User = require('../models/user');
const Activation = require('../models/activation');

exports.signUp = async (req, res, next) => {
    try {
        await new User(req.body).save();
        res.status(200).send({ message: "User created successfully."});
    } catch (err) {
        next(err);
    }
};

exports.followUser = async (req, res, next) => {
    try {
        const following = await User.findById(req.body.followingId);
        const follower = await User.findById(req.body.followerId);
        follower.following.push(req.body.followingId);
        following.followers.push(req.body.followerId);

        following.save();
        follower.save();

        res.status(200).send({ message: "User followed successfully.", user: follower});
    } catch (err) {
        next(err);
    }
};

exports.unfollowUser = async (req, res, next) => {
    try {
        const following = await User.findById(req.body.followingId);
        const follower = await User.findById(req.body.followerId);

        const followerIndex = follower.following.findIndex(user => new String(user._id).trim() === new String(req.body.followingId).trim());
        if (followerIndex >= 0) {
            console.log("followerIndex", followerIndex);
            follower.following.splice(followerIndex, 1);
            console.log("follower.following", follower.following);
        }
        const followingIndex = following.followers.findIndex(user => new String(user._id).trim() === new String(req.body.followerId).trim());
        if (followingIndex >= 0) {
            console.log("followingIndex", followingIndex);
            following.followers.splice(followingIndex, 1);
            console.log("following.followers", following.followers)
        }

        following.save();
        follower.save();

        res.status(200).send({ message: "User unfollowed successfully.", user: follower});
    } catch (err) {
        next(err);
    }
};

exports.followingList = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send({ message: "Following List get successfully.", following: user.following});
    } catch (err) {
        next(err);
    }
};

exports.disableNotifications = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        user.recievenotifications = false;
        user.save();
        res.status(200).send({ message: "Notifications disabled successfully."});
    } catch (err) {
        next(err);
    }
};

exports.enableNotifications = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        user.recievenotifications = true;
        user.save();
        res.status(200).send({ message: "Notifications enabled successfully."});
    } catch (err) {
        next(err);
    }
};

exports.requestActivation = async(req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if(user.active) {
            res.status(400).send({message: "user is active already."});
        }  else {
            await new Activation({userid: req.body.id}).save();
            res.status(200).send({message: "success."});
        }
    } catch (err) {
        next(err);
    }
};

exports.listUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send({message: "success.", users: users});
    } catch (err) {
        next(err);
    }
};

exports.userFollowings = async(req, res, next) => {
    try {
        const user = await User.findOne({_id: req.params.id}).populate(
            {path: 'following', select: '_id email username'}
        );
        const followings = user.following;
        res.status(200).send({message: "success.", followings: followings});
    } catch (err) {
        next(err);
    }
};
