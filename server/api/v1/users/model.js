var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcryptjs'));
var bookshelf = require('./../../../config/db').bookshelf;
let Incidencia = require('./../incidencias/model');

bookshelf.plugin('registry')

var User = bookshelf.Model.extend({
    tableName: 'TUSUARIO',
    hasTimestamps: true,
    idAttribute: 'CODUSUARIO',
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        this.on('saving', this.hashPassword, this);
    },
    incidencias: function() {
        return this.hasMany("Incidencia");
    },
    hashPassword: function(model, attrs, options) {
        return new Promise(function(resolve, reject) {
            //console.log(model.attributes.PASSWORD);
            bcrypt.hash(model.attributes.PASSWORD, 10, function(err, hash) {
                if( err ) reject(err);
                model.set('PASSWORD', hash);
                resolve(hash); // data is created only after this occurs
            });
        });
    },
    validPassword: function(password, user) {
        //console.log(user.attributes.password)
        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, user.attributes.PASSWORD, function (err, match) {
            if(err) reject(err);
            //console.log(match)
            resolve(match); //? true : false;
            });
        });
    }
},
{

});

module.exports = {
    User: bookshelf.model('User', User)
};