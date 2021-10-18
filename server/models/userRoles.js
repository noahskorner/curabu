const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userRoles', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'userRoles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "userRoles_pkey",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "role" },
        ]
      },
    ]
  });
};
