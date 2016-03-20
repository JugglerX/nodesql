'use strict';
module.exports = function(sequelize, DataTypes) {
  var Champion = sequelize.define('Champion', {
    championId: DataTypes.INTEGER,
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Champion;
};