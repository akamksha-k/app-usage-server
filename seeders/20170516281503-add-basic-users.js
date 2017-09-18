'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'terry',
          firstname: 'Terry',
          lastname:'Green',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'sally',
          firstname: 'Sally',
          lastname:'Spock',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'bob',
          firstname: 'Robert',
          lastname:'Brindle',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
