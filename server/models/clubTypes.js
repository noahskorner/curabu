const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clubTypes', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'clubTypes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clubTypes_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
