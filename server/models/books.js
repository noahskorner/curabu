const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "books",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      imageURL: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      numPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "books",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "books_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
