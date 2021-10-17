const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admins', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    clubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clubs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'admins',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admins_pkey",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "clubId" },
        ]
      },
    ]
  });
};
