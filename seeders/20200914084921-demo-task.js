'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
await queryInterface.bulkInsert('task', [
            {
                name: 'Test title',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Test title 2',
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('task', null, {});
  }
};
