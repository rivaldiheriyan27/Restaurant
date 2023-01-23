'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsToMany(models.Table,{
        through:"Orders",
      })
    }
  }
  Food.init({
    nameFood: DataTypes.STRING,
    picture: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};