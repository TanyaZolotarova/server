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
 await queryInterface.bulkInsert('Tasks', [
            {
                title: 'Test title',
                userId: 1,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Test title 2',
                userId: 1,
                status: 1,
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
   await queryInterface.bulkDelete('Tasks', null, {});
  }
};
