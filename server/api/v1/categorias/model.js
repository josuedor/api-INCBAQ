var bookshelf = require('./../../../config/db').bookshelf;
let SubCategoria = require('./../subcategorias/model');
let Incidencia = require('./../incidencias/model');

bookshelf.plugin('registry')

var Categoria = bookshelf.Model.extend({
    tableName: 'DCATEGORIA',
    idAttribute: 'CODCATEGORIA',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    },
    subcategorias: function() {
        return this.hasMany("SubCategoria");
    },
    incidencias: function() {
        return this.hasMany("Incidencia");
    },
});

module.exports = {
    Categoria: bookshelf.model('Categoria', Categoria)
}