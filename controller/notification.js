const Notification = require('../models/notification');
const User = require('../models/user');

exports.getNotificationsForUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const list = await Notification.find(
            {
                '$and':[
                    {
                        'to': userId
                    },
                    {
                        'read_by':
                            {
                                "$ne": userId
                            }
                    }
                ]
            }
        );

        const result = await User.populate(list, {path: 'from', select: '_id email username'});

        res.status(200).send({ message: "Posts got successfully.", notifications: result});
    } catch (err) {
        next(err);
    }
};

exports.readNotification = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const id = req.params.id;

        const list = await Notification.findByIdAndUpdate(
            {
                '_id': id
            },
            { $push: { read_by: userId } }
        );

        res.status(200).send({ message: "Posts got successfully."});
    } catch (err) {
        next(err);
    }
};
