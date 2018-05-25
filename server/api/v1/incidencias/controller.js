const config = require('./../../../config');
const Model = require('./model');

/* Save a incidencias */
exports.create = function (req, res) {
	new Model.Incidencia({
		//CODINCIDENCIA: req.body.codinicidencia,
		CODCATEGORIA: req.body.codcategoria,
		DESCRIPCION: req.body.descripcion,
		CODPREDIO: req.body.codpredio,
		CALIFICACION: req.body.calificacion,
		USUARIO: req.decoded._id // tomado del token
	}).save()
		.then(function (incidencias) {
			res.json(incidencias);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Get all incidencias*/
exports.all = function (req, res) {
	new Model.Incidencia().fetchAll({withRelated: ['USUARIO', 'CATEGORIA', 'PREDIO']})
		.then(function (incidencias) {
			res.json(incidencias);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};