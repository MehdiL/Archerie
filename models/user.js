"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        login: {type:DataTypes.STRING,unique: 'compositeIndex'},
        password: DataTypes.STRING,
        isadmin: DataTypes.BOOLEAN,
        isrespgamme: DataTypes.BOOLEAN,
        isouvrier: DataTypes.BOOLEAN,
        isvente: DataTypes.BOOLEAN,
        isachat: DataTypes.BOOLEAN,
        iscompta: DataTypes.BOOLEAN,

    }, {
        classMethods: {
            associate: function(models) {
                //les has many
            }
        }
    });

    return User;
};