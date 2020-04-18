const Ad = require('../models/ad');
const Filter = require('../models/filteration');
const Post = require('../models/post');
const Activation = require('../models/activation');
const User = require('../models/user');
const multiparty = require('multiparty');
const fs = require('fs');

exports.pushAd = async (req, res, next) => {
    try {
        let form = new multiparty.Form();
        let body = {};        
        form.parse(req, async function(err, fields, files) {
            console.log(files);
            console.log(fields);
            body['text'] = fields.text[0];
            body['isAll'] = fields.isAll[0];
            file = files.image[0];
            console.log(file);
            
            var tmp_path = file.path;
            var target_path = 'public/' + file.originalFilename;

            body['image'] = file.originalFilename;

            /** A better way to copy the uploaded file. **/
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', async function () {
                await new Ad(body).save();
                res.status(200).send({ message: "Ad pushed successfully."});
            });
            src.on('error', function (err) {
                next(err);
            });
        });
    } catch (err) {
        next(err);
    }
};

exports.getAd = async (req, res, next) => {
    try {
        res.status(200).send({message: "success", data: await Ad.findOne()});
    } catch (err) {
        next(err);
    }
}

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

exports.acceptActivation = async(req, res, next) => {
    try {
        const activation = await Activation.find({_id: req.body.id});
        await User.updateOne({_id: activation.userid}, {active: true});
        await Activation.updateOne({_id: req.body.id}, {reviewed: true});
        res.status(200).send({
            message: "success."
        });
    } catch (err) {
        next(err);
        
    }
}

exports.refuseActivation = async(req, res, next) => {
    try {
        await Activation.updateOne({_id: req.body.id}, {reviewed: true});
        res.status(200).send({
            message: "success."
        });
    } catch (err) {
        console.log(err);
        next(err);
        
    }
}
