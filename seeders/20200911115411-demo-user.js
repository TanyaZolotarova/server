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
        await queryInterface.bulkInsert('Users', [
            {
                name: 'John Doe',
                email: 'test@email',
                password: 'password',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'John Doe 2 ',
                email: 'test@email2',
                password: 'password',
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
