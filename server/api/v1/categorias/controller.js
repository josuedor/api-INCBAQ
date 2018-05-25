const config = require('./../../../config');
const Model = require('./model');

/* Save a categoria */
exports.create = function (req, res) {
	new Model.Categoria({
		//CODCATEGORIA: req.body.codcategoria,
		NOMBRE: req.body.nombre,
		DESCRIPCION: req.body.descripcion,
		VIGENTE: req.body.vigente
	}).save()
		.then(function (categoria) {
			res.json(categoria);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Get all categorias*/
exports.all = function (req, res) {
	new Model.Categoria().fetchAll()
		.then(function (categorias) {
			res.json(categorias);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

