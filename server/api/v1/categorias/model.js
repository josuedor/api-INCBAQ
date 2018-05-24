var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcryptjs'));
var bookshelf = require('./../../../config/db').bookshelf;

var Categoria = bookshelf.Model.extend({
    tableName: 'categoria',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    }
},
{
  
});

module.exports = {
	Categoria: Categoria
};