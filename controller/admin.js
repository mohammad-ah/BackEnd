const Ad = require('../models/ad');
const Filter = require('../models/filteration');
const Post = require('../models/post');
const Activation = require('../models/activation')

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
            message: "success.",
            data: await Post.find({unhealthy: true}).populate({path: 'userid', module: 'User'})
        });
    } catch (err) {
        next(err);
    }
}

exports.disableHealthy = async(req, res, next) => {
    try {
        await Post.updateOne({_id: req.body.id}, {unhealthy: false});
        res.status(200).send({ message: "success."});
    } catch (err) {
        next(err);
    }
}

exports.getActivationRequests = async(req, res, next) => {
    try {
        res.status(200).send({
            message: "success.",
            data: await Activation.find().populate({path: 'userid', module: 'User'})
        });
    } catch (err) {
        next(err);
        
    }
}