var bookshelf = require('./../../../config/db').bookshelf;
let Incidencia = require('./../incidencias/model');

bookshelf.plugin('registry')

var Predio = bookshelf.Model.extend({
    tableName: 'TPREDIO',
    idAttribute: 'CODPREDIO',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    },
    incidencias: function() {
        return this.hasMany("Incidencia");
    },
});

module.exports = {
    Predio: bookshelf.model('Predio', Predio)
}