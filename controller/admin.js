const Ad = require('../models/ad');

exports.signUp = async (req, res, next) => {
    try {
        await new Ad(req.body).save();
        res.status(200).send({ message: "Ad pushed successfully."});
    } catch (err) {
        next(err);
    }
};