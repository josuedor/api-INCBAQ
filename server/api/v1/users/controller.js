const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Model = require('./model');

/* Save a user */
exports.create = function (req, res) {
	new Model.User({
		password: req.body.password,
		email: req.body.email,
        name: req.body.name,
        enable: 1
	}).save()
		.then(function (user) {
			res.json(user);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all users */
exports.all = function (req, res) {
	new Model.User().fetchAll()
		.then(function (users) {
			res.json(users);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Delete a user */
exports.delete = function (req, res) {
	let userId = req.params.id;
	new Model.User().where('id', userId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get a user */
exports.profile = function (req, res) {
	const userId = req.params.id;
	new Model.User().where('id', userId)
		.fetch()
		.then(function (user) {
			res.json(user);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
	new Model.User().where('email', email)
		.fetch()
		.then(function (user) {
            if(user){
                new Model.User().validPassword(password, user)
                .then(function (valid){
                    console.log(valid)
                    if(valid){
                        res.json(user.omit(password));
                    }else{
                        res.status(401).json({
                            message: "No se encontro usuario con esas credenciales."
                        });
                    }
                })
             }else{
                res.status(401).json({
                    message: "No se encontro usuario con esas credenciales."
                });
             }
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};