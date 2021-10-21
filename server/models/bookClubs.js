const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookClubs', {
    id: {
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
    tableName: 'bookClubs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookClubs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
