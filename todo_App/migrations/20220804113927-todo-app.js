'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      name: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};
