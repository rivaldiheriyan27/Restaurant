'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Food, {
        foreignKey: "FoodId"
      }), Order.belongsTo(models.Table, {
        foreignKey: "TableId"
      });
    }
  }
  Order.init({
    TableId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPice: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};