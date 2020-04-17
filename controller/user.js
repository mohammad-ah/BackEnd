const User = require('../models/user');
const Activation = require('../models/activation');


exports.signUp = async (req, res, next) => {
    const password = req.body.password;
    delete req.body.password;
    console.log(req.body);
    console.log(password);

    try {
        const user = await new User(req.body).save();
        console.log(user);
        user.setPassword(password);
        user.save(function(err) {
            let token;
            token = user.generateJwt();
            res.status(200).send({ message: "User created successfully.", user: user, "token" : token});

        });
        console.log(user);

    } catch (err) {
        next(err);
    }
};

exports.followUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const follower = await User.findById(req.body.followerId);
        follower.followers.push(req.body.id);
        user.following.push(req.body.followerId);

        user.save();
        follower.save();

        res.status(200).send({ message: "User followed successfully.", user: follower});
    } catch (err) {
        next(err);
    }
};

exports.unfollowUser = async (req, res, next) => {
    try {
        const userF = await User.findById(req.body.id);
        const following = await User.findById(req.body.followingId);

        const followerIndex = userF.following.findIndex(user => new String(user._id).trim() === new String(req.body.followingId).trim());
        if (followerIndex >= 0) {
            console.log("followerIndex", followerIndex);
            userF.following.splice(followerIndex, 1);
            console.log("follower.following", userF.following);
        }
        const followingIndex = following.followers.findIndex(user => new String(user._id).trim() === new String(req.body.id).trim());
        if (followingIndex >= 0) {
            console.log("followingIndex", followingIndex);
            following.followers.splice(followingIndex, 1);
            console.log("following.followers", following.followers)
        }

        console.log(userF)
        console.log(following)

        userF.save();
        following.save();

        res.status(200).send({ message: "User unfollowed successfully.", user: userF});
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
        const user = await User.findOne({_id: req.body.id});
        const users = await User.find(
            {
                "following": {
                    "$nin": user.following
                }
            }
        );
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

exports.login = async (req, res, next) => {
    console.log('start')
    const password = req.body.password;
    const email = req.body.username;
    console.log(email)
    try {
        console.log('in 1')
        const user = await User.findOne({email: email});
        console.log(user)
        if (user.validPassword(password))
        {
            console.log('in')
            const token = user.generateJwt();
            console.log(token)

            res.status(200).send({ message: "User logged in successfully.", user: user, token: token});
            return;
        }
        res.status(401).send({ message: "Password is incorrect."});
    } catch (err) {
        next(err);
    }
};
