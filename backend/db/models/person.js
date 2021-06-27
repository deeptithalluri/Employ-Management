const { DataTypes, Sequelize } = require("sequelize");

// ORM that represent Person in database.
module.exports = (sequelize) =>
  sequelize.define("person", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
