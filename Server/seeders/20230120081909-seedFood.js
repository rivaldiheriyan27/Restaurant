'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const food = require("../../data/food.json");
    food.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Food", food, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", null, {
      restartIdentity: true
    });
  }
};
