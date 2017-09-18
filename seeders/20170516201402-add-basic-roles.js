'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          key: 'study-manager',
          description: 'Study Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'author',
          description: 'Author',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'reviewer',
          description: 'Reviewer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
