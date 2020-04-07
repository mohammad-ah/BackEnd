const Ad = require('../models/ad');
const Filter = require('../models/filteration');
const Post = require('../models/post');

exports.pushAd = async (req, res, next) => {
    try {
        await new Ad(req.body).save();
        res.status(200).send({ message: "Ad pushed successfully."});
    } catch (err) {
        next(err);
    }
};

exports.addFilter = async(req, res, next) => {
    try {
        await new Filter(req.body).save();
        res.status(200).send({ message: "Filter added successfully."});
    } catch (err) {
        next(err);
    }
}

exports.getFiltered = async(req, res, next) => {    
    try {
        res.status(200).send({
            message: "Filter added successfully.",
            data: await Filter.find()
        });
    } catch (err) {
        next(err);
    }
}

exports.getUnhealthy = async(req, res, next) => {    
    try {
        res.status(200).send({
            message: "Filter added successfully.",
            data: await Post.find({unhealthy: true}).populate({path: 'userid', module: 'User'}).execPopulate()
        });
    } catch (err) {
        next(err);
    }
}