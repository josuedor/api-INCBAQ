const config = require('./../../../config');
const Model = require('./model');

/* Save a predios */
exports.create = function (req, res) {
	new Model.Predio({
		//CODPREDIO: req.body.codpredio,
		DIRECCION: req.body.direccion,
		VIA: req.body.via,
		NUMVIA: req.body.numvia,
		CRUCE: req.body.cruce,
		NUMCRUCE: req.body.numcruce,
		BARRIO: req.body.barrio,
		MUNICIPIO: req.body.municipio,
		GEOLOCAX: req.body.geolocax,
		GEOLOCAY: req.body.geolocay
	}).save()
		.then(function (predios) {
			res.json(predios);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

/* Get all predios*/
exports.all = function (req, res) {
	new Model.Predio().fetchAll()
		.then(function (predios) {
			res.json(predios);
		}).catch(function (error) {
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
};

