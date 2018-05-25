const config = require('./../../../config');
const Model = require('./model');

/* Save a subcategoria */
exports.create = function (req, res) {
	new Model.SubCategoria({
		//CODCATEGORIA: req.body.codcategoria,
		NOMBRE: req.body.nombre,
		DESCRIPCION: req.body.descripcion,
		VIGENTE: req.body.vigente
	}).save()
		.then(function (subcategoria) {
			res.json(subcategoria);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

/* Get all subcategoria*/
exports.all = function (req, res) {
	new Model.Categoria().fetchAll()
		.then(function (subcategoria) {
			res.json(subcategoria);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

