var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcryptjs'));
var bookshelf = require('./../../../config/db').bookshelf;

var SubCategoria = bookshelf.Model.extend({
    tableName: 'DSUBCATEGORIA',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    }
},
{
  
});

module.exports = {
	Categoria: SubCategoria
};