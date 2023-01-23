'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Table = require("../../data/table.json");
    Table.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Tables", Table, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tables", null, {
      restartIdentity: true
    });
  }
};
