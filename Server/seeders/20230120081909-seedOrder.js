'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Order = require("../../data/order.json");
    Order.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Orders", Order, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {
      restartIdentity: true
    });
  }
};
