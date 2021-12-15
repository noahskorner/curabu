const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "posts",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "clubs",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      body: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      tableName: "posts",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "posts_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
      defaultScope: {
        include: ["comments"],
      },
    }
  );
};
