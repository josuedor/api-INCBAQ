var bookshelf = require('./../../../config/db').bookshelf;
let User = require('./../users/model');
let Categoria = require('./../categorias/model');
let Predio = require('./../predios/model');

bookshelf.plugin('registry')

var Incidencia = bookshelf.Model.extend({
    tableName: 'TINCIDENCIAS',
    idAttribute: 'CODINCIDENCIA',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    },
    USUARIO: function() {
        return this.belongsTo("User", "CODUSUARIO");
    },
    CATEGORIA: function() {
        return this.belongsTo("Categoria", "CODCATEGORIA");
    },
    PREDIO: function() {
        return this.belongsTo("Predio", "CODPREDIO");
    }
});

module.exports = {
    Incidencia: bookshelf.model('Incidencia', Incidencia)
}