'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('todos',
        'user_id', {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id'
          },
          allowNull: false,
          after:'id'
        });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn('todos', 'user_id');
  }
};
