const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Model = require('./model');

exports.all = (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    
    const items = Model
        .find()
        .skip(skip)
        .limit(limit);
    
    const count = Model.count();
    
    Promise.all([items.exec(), count.exec()])
        .then( data => {
            res.json({
                data: data[0],
                limit,
                skip,
                count: data[1]
            })
        })
        .catch( err => {
            next(new Error(err));
        });
};


exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
    });
    
    document.save()
        .then( doc => {
            const token = jwt.sign({
                    _id: doc._id
                },
                config.jwt.secret,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });
            res.json({
                user: doc,
                token
            });
        })
        .catch( err => {
            next(new Error(err));
        });
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Model.findOne({ email: email })
        .then(doc => {
            if(doc){
                // Compare Password
                doc.comparePassword(password, (err, match) => {
                    if (err) {
                        next(new Error(err));
                    } else {
                        if (match) {
                            const token = jwt.sign({
                                    _id: doc._id
                                },
                                config.jwt.secret,
                                {
                                    algorithm: 'HS256',
                                    expiresIn: '1h'
                                });
                            res.json({
                                user: doc,
                                token
                            });
                        } else {
                            res.status(401).json({
                                message: "Unauthorized"
                            });
                        }
                    }
                });
            }else{
                res.status(404).json({
                    message: "Document not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.profile = (req, res, next) => {
    Model.findById(req.decoded._id)
        .then( doc => {
            if(doc){
               res.json(doc);
            }else{
                res.status(404).json({
                    message: "Document not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};
