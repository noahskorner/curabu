const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookClubBooks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bookClubId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bookClubs',
        key: 'id'
      }
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    isCurrentBook: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bookClubBooks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookClubBooks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
