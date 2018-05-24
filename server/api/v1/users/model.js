var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcryptjs'));
var bookshelf = require('./../../../config/db').bookshelf;

var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        this.on('saving', this.hashPassword, this);
    },
    hashPassword: function(model, attrs, options) {
        return new Promise(function(resolve, reject) {
            bcrypt.hash(model.attributes.password, 10, function(err, hash) {
                if( err ) reject(err);
                model.set('password', hash);
                resolve(hash); // data is created only after this occurs
            });
        });
    },
    validPassword: function(password, user) {
        //console.log(user.attributes.password)
        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, user.attributes.password, function (err, match) {
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
	User: User
};