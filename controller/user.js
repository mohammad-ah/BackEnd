const User = require('../models/user');

exports.signUp = async (req, res, next) => {
    try {
        await new User(req.body).save();
        res.status(200).send({ message: "User created successfully."});
    } catch (err) {
        next(err);
    }
};
