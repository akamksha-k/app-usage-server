'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      key: { type: DataTypes.STRING, allowNull: false },
      description:{type: DataTypes.STRING, allowNull: false}
    },
    {
      classMethods: {
        associate: models => {
          models.Role.hasMany(models.UserRole);
          models.Role.belongsToMany(models.User, { through: 'UserRoles' });
        },
      },
    }
  );
  return Role;
};
