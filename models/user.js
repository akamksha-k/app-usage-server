'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false }
    },
    {
      classMethods: {
        associate: models => {
          models.User.hasMany(models.UserRole);
          models.User.belongsToMany(models.Role, { through: 'UserRoles' });
        },
      },
    }
  );
  return User;
};

