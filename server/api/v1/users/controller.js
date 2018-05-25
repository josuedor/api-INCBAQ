const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Model = require('./model');

/* Save a user */
exports.create = function (req, res) {
	new Model.User({
		//CODUSUARIO: req.body.codusuario,
		NOMBRES: req.body.nombres,
		EMAIL: req.body.email,
		PASSWORD: req.body.password,
		TIPO_USUARIO: req.body.tipo_usuario,
		ESTADO: 1
	}).save()
		.then(function (user) {
			const token = jwt.sign({
				_id: user.CODUSUARIO
			},
			config.jwt.secret,
			{
				algorithm: 'HS256',
				expiresIn: '1h'
			});
			res.json({
				user: user,
				token
			});
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Get all users */
exports.all = function (req, res) {
	new Model.User().fetchAll()
		.then(function (users) {
			res.json(users);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Delete a user */
exports.delete = function (req, res) {
	let userId = req.params.id;
	new Model.User().where('id', userId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Get a user */
exports.profile = function (req, res) {
	const userId = req.decoded._id;
	new Model.User().where('CODUSUARIO', userId)
		.fetch()
		.then(function (user) {
			res.json(user);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
	new Model.User().where('EMAIL', email)
		.fetch()
		.then(function (user) {
            if(user){
                new Model.User().validPassword(password, user)
                .then(function (valid){
                    console.log(valid)
                    if(valid){
						const token = jwt.sign({
							_id: user.CODUSUARIO
						},
						config.jwt.secret,
						{
							algorithm: 'HS256',
							expiresIn: '1h'
						});
						res.json({
							user: user, //user.omit("password"),
							token
						});
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
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};