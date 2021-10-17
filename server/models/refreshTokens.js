const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refreshTokens', {
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    dateCeated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'refreshTokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refreshTokens_pkey",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
};
