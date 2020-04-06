const Ad = require('../models/ad');
const Filter = require('../models/filteration');

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