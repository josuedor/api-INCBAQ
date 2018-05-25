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

/* Get a incidencias x categorias */
exports.categoria = function (req, res) {
	const codcategoria = req.body.codcategoria || req.query.codcategoria;
	if (codcategoria) {
		new Model.Incidencia().where('CODCATEGORIA', codcategoria)
		.fetchAll({withRelated: ['USUARIO', 'CATEGORIA', 'PREDIO']})
		.then(function (incidencias) {
			res.json(incidencias);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
	} else {
		res.status(401).json({
			message: "Debe enviar la categoria para consumir el servicio."
		});
	}
};