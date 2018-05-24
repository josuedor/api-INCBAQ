const config = require('./../../../config');
const Model = require('./model');

/* Save a categoria */
exports.create = function (req, res) {
	new Model.Categoria({
		categoria: req.body.categoria,
		vigente: req.body.vigente
	}).save()
		.then(function (categoria) {
			res.json(categoria);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all categorias*/
exports.all = function (req, res) {
	new Model.Categoria().fetchAll()
		.then(function (categorias) {
			res.json(categorias);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

