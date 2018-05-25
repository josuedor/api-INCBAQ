var bookshelf = require('./../../../config/db').bookshelf;
let Categoria = require('./../categorias/model');

bookshelf.plugin('registry')

var SubCategoria = bookshelf.Model.extend({
    tableName: 'DSUBCATEGORIA',
    idAttribute: 'CODSUBCATEG',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    },
    CATEGORIA: function() {
        return this.belongsTo("Categoria", "CODCATEGORIA");
    }
});

module.exports = {
    SubCategoria: SubCategoria
}